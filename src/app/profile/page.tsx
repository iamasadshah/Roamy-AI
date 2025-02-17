"use client";
import { useState, useEffect } from "react";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import { FaUser, FaHistory, FaHeart, FaCog } from "react-icons/fa";
import Image from "next/image";

// Add interface for saved trip type
interface SavedTrip {
  id: string;
  user_id: string;
  // Add other trip properties as needed
}
export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          // Load saved trips
          const { data: trips } = await supabase
            .from("saved_trips")
            .select("*")
            .eq("user_id", user.id);
          setSavedTrips(trips || []);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-navy to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 space-y-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={
                      user?.user_metadata?.avatar_url ||
                      "/images/default-avatar.png"
                    }
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {user?.user_metadata?.full_name || "User"}
                </h2>
                <p className="text-white/60 text-sm">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-gold text-navy"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <FaUser />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab("trips")}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "trips"
                      ? "bg-gold text-navy"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <FaHistory />
                  <span>My Trips</span>
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "saved"
                      ? "bg-gold text-navy"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <FaHeart />
                  <span>Saved</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-gold text-navy"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <FaCog />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6"
            >
              {/* Content based on active tab */}
              {activeTab === "profile" && <ProfileContent user={user} />}
              {activeTab === "trips" && <TripsContent trips={savedTrips} />}
              {activeTab === "saved" && (
                <SavedContent savedTrips={savedTrips} />
              )}
              {activeTab === "settings" && <SettingsContent user={user} />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these component definitions at the bottom of the file
function ProfileContent({ user }: { user: User | null }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Profile Information</h3>
      <div className="text-white">
        <p>Name: {user?.user_metadata?.full_name || "Not set"}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}

function TripsContent({ trips }: { trips: SavedTrip[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">My Trips</h3>
      <div className="text-white">
        {trips.length > 0 ? (
          trips.map((trip) => <div key={trip.id}>Trip ID: {trip.id}</div>)
        ) : (
          <p>No trips found</p>
        )}
      </div>
    </div>
  );
}

function SavedContent({ savedTrips }: { savedTrips: SavedTrip[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Saved Destinations</h3>
      <div className="text-white">
        {savedTrips.length > 0 ? (
          savedTrips.map((trip) => (
            <div key={trip.id}>Saved Trip ID: {trip.id}</div>
          ))
        ) : (
          <p>No saved destinations</p>
        )}
      </div>
    </div>
  );
}

function SettingsContent({ user }: { user: User | null }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Account Settings</h3>
      <div className="text-white">
        <p>Account: {user?.email}</p>
      </div>
    </div>
  );
}
