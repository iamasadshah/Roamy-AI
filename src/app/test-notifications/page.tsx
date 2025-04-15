import TestNotification from "@/components/TestNotification";

export default function TestNotificationsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Push Notifications Test</h1>
      <div className="max-w-md mx-auto">
        <TestNotification />
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Testing Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Make sure you're logged in to your account</li>
            <li>Allow notifications when prompted by your browser</li>
            <li>Click the "Send Test Notification" button</li>
            <li>You should receive a notification on your device</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
