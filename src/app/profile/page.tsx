"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import {
  FaUser,
  FaHistory,
  FaCog,
  FaMapMarkerAlt,
  FaCalendar,
  FaUsers,
  FaHotel,
  FaWallet,
  FaDownload,
  FaEye,
  FaTrash,
  FaArrowLeft,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TripPDF from "@/components/TripPDF";
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
  location: string;
  phone: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: "",
    avatar_url: "",
    bio: "",
    location: "",
    phone: "",
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
            location: user.user_metadata?.location || "",
            phone: user.user_metadata?.phone || "",
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
        toast.error("Failed to load profile");
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
      
      toast.success("Profile updated successfully!");
      setEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const deleteTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from("trips")
        .delete()
        .eq("id", tripId);
      
      if (error) throw error;
      
      setSavedTrips(prev => prev.filter(trip => trip.id !== tripId));
      toast.success("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Ultra-light static background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <button className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-150 px-4 py-2 rounded-xl hover:bg-white/50 backdrop-blur-sm">
                <FaArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <FaShieldAlt className="h-4 w-4 text-blue-500" />
                <span>Roamy AI Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30">
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                  <Image
                        src={profileData.avatar_url || "/images/default-avatar.png"}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {profileData.full_name || "User"}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{user.email}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  <FaShieldAlt className="h-4 w-4" />
                  <span>Premium Member</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-3">
                {[
                  { id: "profile", label: "Profile", icon: FaUser, color: "blue" },
                  { id: "trips", label: "My Trips", icon: FaHistory, color: "green" },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-150 font-medium ${
                        isActive
                          ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg`
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      {item.label}
                </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
    <div className="space-y-8">
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Profile Information</h3>
                    {!editingProfile ? (
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
                      >
                        <FaEdit className="h-4 w-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150"
                        >
                          <FaSave className="h-4 w-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProfile(false)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-150"
                        >
                          <FaTimes className="h-4 w-4" />
                          Cancel
                        </button>
              </div>
            )}
      </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {editingProfile ? (
              <input
                type="text"
                value={profileData.full_name}
                          onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{profileData.full_name || "Not set"}</p>
                      )}
            </div>

            <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {editingProfile ? (
              <input
                type="text"
                value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{profileData.location || "Not set"}</p>
                      )}
            </div>

            <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {editingProfile ? (
              <input
                type="tel"
                value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{profileData.phone || "Not set"}</p>
                      )}
            </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      {editingProfile ? (
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.bio || "No bio added yet"}</p>
                      )}
            </div>
            </div>
            </div>
          </div>
        )}

            {/* Trips Tab */}
            {activeTab === "trips" && (
              <div className="space-y-8">
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">My Saved Trips</h3>
                  
                  {savedTrips.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaHistory className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No trips saved yet</h4>
                      <p className="text-gray-600 mb-4">Start planning your next adventure!</p>
                      <Link href="/plan" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-150">
                        Plan a Trip
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedTrips.map((trip) => (
                        <div key={trip.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-150">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-gray-800 mb-2">{trip.destination}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <FaCalendar className="h-4 w-4" />
                                  <span>{format(new Date(trip.start_date), 'MMM dd')} - {format(new Date(trip.end_date), 'MMM dd, yyyy')}</span>
                                </div>
      </div>
    </div>
                            <div className="flex gap-2">
          <button
                                onClick={() => deleteTrip(trip.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                title="Delete trip"
                              >
                                <FaTrash className="h-4 w-4" />
          </button>
        </div>
    </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <FaUsers className="h-4 w-4 text-blue-500" />
                              <span>{trip.travelers} travelers</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaHotel className="h-4 w-4 text-green-500" />
                              <span>{trip.accommodation}</span>
        </div>
                            <div className="flex items-center gap-2">
                              <FaWallet className="h-4 w-4 text-purple-500" />
                              <span>{trip.budget}</span>
                    </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="h-4 w-4 text-red-500" />
                              <span>{trip.destination}</span>
              </div>
            </div>

                          <div className="flex justify-start">
                  <PDFDownloadLink
                    document={<TripPDF trip={trip} />}
                              fileName={`${trip.destination}-trip-plan.pdf`}
                              className="flex items-center font-semibold gap-2 px-12 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150 text-md font-medium"
                            >
                              <FaDownload className="h-4 w-4" />
                              PDF
                  </PDFDownloadLink>
                </div>
              </div>
          ))}
        </div>
      )}
                </div>
              </div>
            )}

            
    </div>
        </div>
      </div>
    </div>
  );
}
