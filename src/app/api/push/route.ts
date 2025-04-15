import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import webpush from 'web-push';
import { NextResponse } from 'next/server';
import { getRandomNotification } from '@/utils/notificationMessages';

// Initialize web-push with your VAPID keys
webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_API!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, body, url, userId } = await request.json();

    // Get subscriptions for the specified user or current user
    const targetUserId = userId || user.id;
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', targetUserId);

    if (error) {
      throw error;
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ message: 'No active subscriptions found' });
    }

    // Use provided notification or get a random one
    const notification = title && body ? { title, body, url } : getRandomNotification();

    // Send push notification to each subscription
    const pushPromises = subscriptions.map(async (subscription) => {
      const pushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      };

      const payload = JSON.stringify(notification);

      return webpush.sendNotification(pushSubscription, payload);
    });

    await Promise.all(pushPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending push notification:', error);
    return NextResponse.json(
      { error: 'Failed to send push notification' },
      { status: 500 }
    );
  }
} 