"use client";
import { useState, useEffect, useRef } from "react";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import {
  FaUser,
  FaHistory,
  FaCog,
  FaCamera,
  FaEdit,
  FaSave,
  FaTimes,
  FaMapMarkerAlt,
  FaCalendar,
  FaUsers,
  FaHotel,
  FaWallet,
  FaDownload,
  FaEye,
  FaTrash,
  FaArrowLeft,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
} from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TripPDF from "@/components/TripPDF";
import Link from "next/link";

// Add interface for saved trip type
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

// Add interface for profile data
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
            .from("trips")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100/30"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: Math.random() * 40 + 30,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-xl hover:bg-white/50 backdrop-blur-sm"
              >
                <FaArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </motion.button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <FaBell className="h-4 w-4 text-blue-500" />
                <span>Notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
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
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {user?.user_metadata?.full_name || "User"}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{user?.email}</p>
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
                  { id: "settings", label: "Settings", icon: FaCog, color: "purple" },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-medium ${
                        isActive
                          ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg shadow-${item.color}-500/25`
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : `text-${item.color}-500`}`} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Trips</span>
                    <span className="text-lg font-bold text-gray-800">{savedTrips.length}</span>
            </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm font-medium text-gray-800">
                      {user?.created_at ? format(new Date(user.created_at), "MMM yyyy") : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 min-h-[600px]"
            >
              {/* Content based on active tab */}
              {activeTab === "profile" && <ProfileContent user={user} />}
              {activeTab === "trips" && <TripsContent trips={savedTrips} />}
              {activeTab === "settings" && <SettingsContent user={user} />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileContent({ user }: { user: User | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: user?.user_metadata?.full_name || "",
    avatar_url: user?.user_metadata?.avatar_url || "",
    bio: user?.user_metadata?.bio || "",
    location: user?.user_metadata?.location || "",
    phone: user?.user_metadata?.phone || "",
  });
  const supabase = createClientComponentClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      setIsUploading(true);

      // Upload image to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${user?.id}/${fileName}`, file);

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${user?.id}/${fileName}`);

      // Update profile with new avatar URL
      await handleProfileUpdate({
        ...profileData,
        avatar_url: publicUrl,
      });

      setProfileData((prev) => ({ ...prev, avatar_url: publicUrl }));
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileUpdate = async (newData: ProfileData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: newData,
      });

      if (error) throw error;

      setProfileData(newData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Profile Information</h3>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <FaEdit />
            <span>Edit Profile</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <FaTimes />
            <span>Cancel</span>
          </motion.button>
        )}
      </div>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative group">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-300/50 shadow-xl">
            <Image
              src={profileData.avatar_url || "/images/default-avatar.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg"
          >
            <FaCamera className="h-5 w-5" />
          </motion.button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
          Click the camera icon to update your profile picture
        </p>
          <p className="text-xs text-gray-500">
            Supported formats: JPG, PNG, GIF (Max 5MB)
        </p>
        </div>
      </div>

      {/* Profile Information Form */}
      <div className="space-y-6">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleProfileUpdate(profileData);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.full_name}
                onChange={(e) =>
                  setProfileData({ ...profileData, full_name: e.target.value })
                }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Phone Number
              </label>
                <input
                  type="tel"
                  value={profileData.phone}
                onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                }
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  placeholder="Enter your phone number"
              />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Location
              </label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) =>
                  setProfileData({ ...profileData, location: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="Enter your location"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none"
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-lg shadow-blue-500/25"
            >
                <FaSave className="h-5 w-5" />
              Save Changes
            </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Full Name</h4>
                <p className="text-gray-900 text-lg font-medium">
                {profileData.full_name || "Not set"}
              </p>
            </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Location</h4>
                <p className="text-gray-900 text-lg font-medium">
                {profileData.location || "Not specified"}
              </p>
            </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Phone Number</h4>
                <p className="text-gray-900 text-lg font-medium">
                {profileData.phone || "Not provided"}
              </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Bio</h4>
                <p className="text-gray-900 leading-relaxed">
                  {profileData.bio || "No bio added"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  tripName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tripName: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTrash className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Trip</h3>
          <p className="text-gray-600">
          Are you sure you want to delete &quot;{tripName}&quot;? This action
          cannot be undone.
        </p>
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg shadow-red-500/25"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

function TripsContent({ trips: initialTrips }: { trips: Trip[] }) {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const supabase = createClientComponentClient();

  useEffect(() => {
    setTrips(initialTrips);
  }, [initialTrips]);

  const handleViewDetails = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleCloseModal = () => {
    setSelectedTrip(null);
  };

  const handleDeleteClick = (trip: Trip) => {
    setTripToDelete(trip);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!tripToDelete) return;

    try {
      const { error } = await supabase
        .from("trips")
        .delete()
        .eq("id", tripToDelete.id);

      if (error) throw error;

      setTrips((prevTrips) =>
        prevTrips.filter((trip) => trip.id !== tripToDelete.id)
      );
      toast.success("Trip deleted successfully");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
    } finally {
      setIsDeleteModalOpen(false);
      setTripToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setTripToDelete(null);
  };

  // Add type checking for the modal content
  const renderItineraryDetails = (trip: Trip) => {
    const hasItinerary =
      trip?.itinerary?.itinerary &&
      Array.isArray(trip.itinerary.itinerary) &&
      trip.itinerary.itinerary.length > 0;

    if (!hasItinerary) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600">No itinerary details available</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {trip.itinerary.itinerary.map((day, index) => {
          if (!day) return null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{day.day}</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">
                    {day.day_title || `Day ${day.day}`}
              </h4>
                  {day.day_description && (
                    <p className="text-gray-600 mt-1">{day.day_description}</p>
                  )}
                </div>
              </div>
              
              {/* Highlights */}
              {day.highlights && day.highlights.length > 0 && (
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h5>
                  <div className="flex flex-wrap gap-2">
                    {day.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["morning", "afternoon", "evening"].map((time) => {
                  const activities = day[time as keyof typeof day] as Array<string | { title?: string; description?: string }>;
                  if (!Array.isArray(activities) || activities.length === 0)
                    return null;

                  return (
                    <div key={time} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          time === 'morning' ? 'bg-yellow-500' : 
                          time === 'afternoon' ? 'bg-orange-500' : 'bg-purple-500'
                        }`}></div>
                        <h5 className="text-lg font-semibold text-gray-800 capitalize">{time}</h5>
                      </div>
                      <ul className="space-y-3">
                        {activities.map((activity: string | { title?: string; description?: string }, i: number) => (
                          <li
                            key={i}
                            className="text-gray-700 pl-4 border-l-2 border-gray-200 hover:border-blue-300 transition-colors duration-300 py-1"
                          >
                            {typeof activity === 'string' ? activity : activity.title || activity.description || 'Activity'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Meals */}
              {day.meals && day.meals.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Dining</h5>
                  <div className="space-y-3">
                    {day.meals.map((meal, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">🍽️</span>
                          <h6 className="font-semibold text-gray-800">{meal.restaurant_name}</h6>
                          <span className="text-sm text-gray-500">{meal.time}</span>
            </div>
                        <p className="text-gray-600 text-sm">{meal.cuisine_type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">My Saved Trips</h2>
          <p className="text-gray-600">Manage and view your travel itineraries</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          <FaHistory className="h-4 w-4" />
          <span>{trips.length} {trips.length === 1 ? 'Trip' : 'Trips'}</span>
        </div>
      </div>
      
      {trips.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaMapMarkerAlt className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No trips saved yet</h3>
          <p className="text-gray-600 mb-6">
            Start planning your next adventure and save your itineraries here.
          </p>
          <Link href="/plan">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/25"
            >
              Plan Your First Trip
            </motion.button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 relative group hover:shadow-2xl transition-all duration-300"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDeleteClick(trip)}
                className="absolute top-6 right-6 p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
              >
                <FaTrash className="w-5 h-5" />
              </motion.button>
              
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                    {trip.destination}
                  </h3>
                    <p className="text-gray-600 text-sm">
                      Created {format(new Date(trip.created_at), "MMM d, yyyy")}
                    </p>
                </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <FaCalendar className="text-blue-500 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="text-gray-800 font-medium">
                        {format(new Date(trip.start_date), "MMM d")} - {format(new Date(trip.end_date), "MMM d, yyyy")}
                  </p>
                </div>
                </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <FaUsers className="text-green-500 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-600">Travelers</p>
                      <p className="text-gray-800 font-medium">{trip.travelers}</p>
                </div>
                </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <FaHotel className="text-purple-500 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-600">Accommodation</p>
                      <p className="text-gray-800 font-medium">{trip.accommodation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <FaWallet className="text-orange-500 h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="text-gray-800 font-medium">{trip.budget}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewDetails(trip)}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                  >
                    <FaEye className="h-4 w-4" />
                    <span>View Details</span>
                  </motion.button>
                  <PDFDownloadLink
                    document={<TripPDF trip={trip} />}
                    fileName={`${trip.destination}-itinerary.pdf`}
                  >
                    {({ loading }) => (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg shadow-blue-500/25"
                      >
                        <FaDownload className="h-4 w-4" />
                        <span>{loading ? "Preparing..." : "Download PDF"}</span>
                      </motion.button>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        tripName={tripToDelete?.destination || ""}
      />

      {/* View Details Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedTrip.destination}
              </h3>
                <p className="text-gray-600">
                  {format(new Date(selectedTrip.start_date), "MMM d, yyyy")} - {format(new Date(selectedTrip.end_date), "MMM d, yyyy")}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300"
              >
                <FaTimes className="w-6 h-6" />
              </motion.button>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
            {renderItineraryDetails(selectedTrip)}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SettingsContent({ user }: { user: User | null }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Account Settings</h3>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Information */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaUser className="text-white h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">Account Information</h4>
              <p className="text-gray-600 text-sm">Your basic account details</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="text-gray-800 font-medium">{user?.email}</p>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Verified
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-gray-800 font-medium">
                  {user?.created_at ? format(new Date(user.created_at), "MMMM yyyy") : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <FaShieldAlt className="text-white h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">Security</h4>
              <p className="text-gray-600 text-sm">Manage your account security</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Two-Factor Authentication</p>
                <p className="text-gray-800 font-medium">Not enabled</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Enable
              </motion.button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Password</p>
                <p className="text-gray-800 font-medium">Last changed recently</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Change
              </motion.button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <FaPalette className="text-white h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">Preferences</h4>
              <p className="text-gray-600 text-sm">Customize your experience</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Email Notifications</p>
                <p className="text-gray-800 font-medium">Enabled</p>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Language</p>
                <p className="text-gray-800 font-medium">English</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Change
              </motion.button>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <FaGlobe className="text-white h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">Data & Privacy</h4>
              <p className="text-gray-600 text-sm">Manage your data and privacy</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-white rounded-xl text-left hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm text-gray-600">Download My Data</p>
              <p className="text-gray-800 font-medium">Get a copy of your data</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-white rounded-xl text-left hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm text-gray-600">Delete Account</p>
              <p className="text-red-600 font-medium">Permanently delete your account</p>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
