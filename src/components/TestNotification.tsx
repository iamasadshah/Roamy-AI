"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { sendNotification } from "@/utils/pushNotifications";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function TestNotification() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleTestNotification = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please log in to test notifications");
        return;
      }

      await sendNotification(
        user.id,
        "Test Notification",
        "This is a test notification from Roamy AI!"
      );

      toast.success("Test notification sent!");
    } catch (error) {
      console.error("Error sending test notification:", error);
      toast.error("Failed to send test notification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Test Push Notifications</h2>
      <Button
        onClick={handleTestNotification}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Sending..." : "Send Test Notification"}
      </Button>
    </div>
  );
}
