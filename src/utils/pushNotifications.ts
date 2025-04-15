import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Replace with your VAPID public key
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_API;

interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

interface PushSubscriptionWithKeys extends PushSubscription {
  keys: PushSubscriptionKeys;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  return await Notification.requestPermission();
}

export async function subscribeUserToPush(): Promise<PushSubscription | null> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY!),
    });
    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
}

export async function saveSubscriptionToSupabase(subscription: PushSubscription, userId: string) {
  const supabase = createClientComponentClient();
  const subscriptionWithKeys = subscription as PushSubscriptionWithKeys;

  const { error } = await supabase.from('subscriptions').upsert({
    user_id: userId,
    endpoint: subscription.endpoint,
    p256dh: subscriptionWithKeys.keys.p256dh,
    auth: subscriptionWithKeys.keys.auth,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Failed to save subscription: ${error.message}`);
  }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Function to send a notification
export async function sendNotification(userId: string, title: string, body: string) {
  const supabase = createClientComponentClient();

  // Get the user's subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!subscription) return;

  // Send the notification using the subscription details
  const response = await fetch('/api/send-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscription: {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      },
      title,
      body,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send notification');
  }
} 