"use client";

import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { requestNotificationPermission, subscribeUserToPush, saveSubscriptionToSupabase } from '@/utils/pushNotifications';

export function useNotifications() {
  useEffect(() => {
    const supabase = createClientComponentClient();

    async function setupNotifications() {
      try {
        const permission = await requestNotificationPermission();
        if (permission === "granted") {
          const subscription = await subscribeUserToPush();
          if (subscription) {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              await saveSubscriptionToSupabase(subscription, user.id);
            }
          }
        }
      } catch (error) {
        console.error("Error setting up notifications:", error);
      }
    }

    setupNotifications();
  }, []); // Empty dependency array is fine here since supabase is created inside the effect
} 