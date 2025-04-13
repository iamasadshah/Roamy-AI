import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { requestNotificationPermission, subscribeUserToPush, saveSubscriptionToSupabase } from '@/utils/pushNotifications';

export function useNotifications() {
  const supabase = createClientComponentClient();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Check if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Check if already subscribed
        const { data: existingSubscriptions } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (existingSubscriptions) return;

        // Request permission
        const permission = await requestNotificationPermission();
        if (permission !== 'granted') return;

        // Subscribe to push notifications
        const subscription = await subscribeUserToPush();
        if (!subscription) return;

        // Save subscription to Supabase
        await saveSubscriptionToSupabase(subscription, user.id);
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);
} 