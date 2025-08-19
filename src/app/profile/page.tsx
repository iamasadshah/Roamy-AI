"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import {
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Link from "next/link";

// Simplified Trip interface for better performance
interface Trip {
  id: string;
  user_id: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: string;
  accommodation: string;
  travelers: string;
  created_at: string;
  itinerary: {
    trip_overview: {
      destination: string;
      dates: string;
      duration: string;
      budget_level: "Budget" | "Mid-range" | "Luxury";
      accommodation: string;
      travelers: string;
      dietary_plan: string;
    };
    itinerary: Array<{
      day: number;
      day_title: string;
      day_description: string;
      highlights: string[];
      total_estimated_cost: string;
      morning: Array<{
        time: string;
        title: string;
        description: string;
        location: string;
        cost?: string;
        duration: string;
        special_features?: string[];
        tips?: string;
        booking_info?: string;
      }>;
      afternoon: Array<{
        time: string;
        title: string;
        description: string;
        location: string;
        cost?: string;
        duration: string;
        special_features?: string[];
        tips?: string;
        booking_info?: string;
      }>;
      evening: Array<{
        time: string;
        title: string;
        description: string;
        location: string;
        cost?: string;
        duration: string;
        special_features?: string[];
        tips?: string;
        booking_info?: string;
      }>;
      meals: Array<{
        time: string;
        restaurant_name: string;
        cuisine_type: string;
        location: string;
        cost_range: string;
        must_try_dishes: string[];
        reservation_required: boolean;
        special_features?: string[];
        tips?: string;
      }>;
    }>;
    additional_info: {
      weather_forecast: string;
      packing_tips: string[];
      local_currency: {
        code: string;
        exchangeRate: number;
      };
      transportation: string[];
      emergency: {
        police: string;
        ambulance: string;
        touristPolice?: string;
      };
      local_customs?: string[];
      best_times_to_visit?: string[];
      money_saving_tips?: string[];
      cultural_etiquette?: string[];
      local_phrases?: string[];
      must_know_facts?: string[];
    };
  };
}

interface ProfileData {
  full_name: string;
  avatar_url: string;
  bio: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: "",
    avatar_url: "",
    bio: "",
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          setProfileData({
            full_name: user.user_metadata?.full_name || "",
            avatar_url: user.user_metadata?.avatar_url || "",
            bio: user.user_metadata?.bio || "",
          });
          
          // Load saved trips
          const { data: trips } = await supabase
            .from("trips")
            .select("*")
            .eq("user_id", user.id);
          setSavedTrips(trips || []);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Failed to load profile", {
          position: "bottom-right",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [supabase]);

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: profileData
      });
      
      if (error) throw error;
      
      toast.success("Profile updated successfully!", {
        position: "bottom-right",
        duration: 3000,
      });
      setEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast.error("User not logged in", {
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }

    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileData(prev => ({ ...prev, avatar_url: result }));
    };
    reader.readAsDataURL(file);

    try {
      // Delete old avatar if it exists and is not the default
      if (profileData.avatar_url && !profileData.avatar_url.includes("default-avatar.png") && !profileData.avatar_url.startsWith("data:")) {
        const oldFileName = profileData.avatar_url.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('avatars')
            .remove([oldFileName]);
        }
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateError) throw updateError;

      // Update with final URL
      setProfileData(prev => ({ ...prev, avatar_url: publicUrl }));
      toast.success("Profile picture updated successfully!", {
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to update profile picture", {
        position: "bottom-right",
        duration: 3000,
      });
      // Revert to original on error
      setProfileData(prev => ({ ...prev, avatar_url: user?.user_metadata?.avatar_url || "" }));
    }
  };


  // Professional loading component - optimized for fast loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your profile</p>
          <Link href="/auth" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-150">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 lg:py-20">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          
          {/* Red Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 h-28 sm:h-32 md:h-36 lg:h-40 relative">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-4 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-10">
            
            {/* Profile Avatar */}
            <div className="flex justify-center -mt-12 sm:-mt-16 md:-mt-18 lg:-mt-20 mb-3 sm:mb-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-3 sm:border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                  <Image
                    src={profileData.avatar_url || "/images/default-avatar.png"}
                    alt="Profile Avatar"
                    fill
                    className="object-cover object-center"
                    style={{ borderRadius: '50%' }}
                    priority
                  />
                </div>
                {editingProfile && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <FaEdit className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="text-center">
              {editingProfile ? (
                <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                  <input
                    type="text"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                    className="w-full text-center text-lg sm:text-xl md:text-2xl font-bold bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Name"
                  />
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={3}
                    className="w-full text-center text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 px-2 leading-tight">
                    {profileData.full_name || "Ndife Samuel"}
                  </h1>
                  
                  {/* accent line */}
                  <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-indigo-600 mx-auto rounded-full mb-4 sm:mb-6"></div>
                  
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed px-3 sm:px-4 md:px-6 break-words hyphens-auto">
                    {profileData.bio || "I choose the product design track because I love solving visual problems using UI/UX designs."}
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              {!editingProfile ? (
                <button
                  onClick={() => setEditingProfile(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                  >
                    <FaSave className="w-3 h-3 sm:w-4 sm:h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProfile(false)}
                    className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg"
                  >
                    <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}