import { NextResponse } from 'next/server';
import webpush from 'web-push';

// Initialize web-push with VAPID keys
webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_API!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  try {
    const { subscription, title, body } = await request.json();

    // Send the notification
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title,
        body,
        icon: '/favicon.png',
        badge: '/favicon.png',
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
} 