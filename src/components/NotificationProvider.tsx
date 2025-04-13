"use client";

import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationProvider() {
  useNotifications();
  return null;
}
