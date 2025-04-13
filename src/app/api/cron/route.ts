import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getRandomNotification } from '@/utils/notificationMessages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Helper function to get random time between 9 AM and 9 PM
function getRandomTime() {
  const now = new Date();
  const hours = Math.floor(Math.random() * 12) + 9; // Random hour between 9 and 21
  const minutes = Math.floor(Math.random() * 60);
  return new Date(now.setHours(hours, minutes, 0, 0));
}

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get all users with active subscriptions
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*');

    if (error) {
      throw error;
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ message: 'No active subscriptions found' });
    }

    // Group subscriptions by user to avoid duplicate notifications
    const userSubscriptions = new Map();
    subscriptions.forEach(sub => {
      if (!userSubscriptions.has(sub.user_id)) {
        userSubscriptions.set(sub.user_id, sub);
      }
    });

    // Get a random notification message
    const notification = getRandomNotification();

    // Send notifications to each user at a random time
    const notificationPromises = Array.from(userSubscriptions.values()).map(async (subscription) => {
      const randomTime = getRandomTime();
      const delay = randomTime.getTime() - Date.now();

      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const response = await fetch('/api/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...notification,
          userId: subscription.user_id,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to send notification to user ${subscription.user_id}`);
      }
    });

    await Promise.all(notificationPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in cron job:', error);
    return NextResponse.json(
      { error: 'Failed to process cron job' },
      { status: 500 }
    );
  }
} 