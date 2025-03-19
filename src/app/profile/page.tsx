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
  FaHeart,
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
} from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TripPDF from "@/components/TripPDF";

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
  itinerary: any;
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
      const { data, error } = await supabase.storage
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
      const { data, error } = await supabase.auth.updateUser({
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
        <h3 className="text-2xl font-bold text-white">Profile Information</h3>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors"
          >
            <FaEdit />
            <span>Edit Profile</span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 text-white/80 hover:text-red-500 transition-colors"
          >
            <FaTimes />
            <span>Cancel</span>
          </motion.button>
        )}
      </div>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gold/30">
            <Image
              src={profileData.avatar_url || "/images/default-avatar.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-gold text-navy p-2 rounded-full hover:bg-gold/90 transition-colors"
          >
            <FaCamera />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        <p className="text-sm text-white/60">
          Click the camera icon to update your profile picture
        </p>
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
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.full_name}
                onChange={(e) =>
                  setProfileData({ ...profileData, full_name: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-gold"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-gold"
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Location
              </label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) =>
                  setProfileData({ ...profileData, location: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-gold"
                placeholder="Enter your location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-gold"
                placeholder="Enter your phone number"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2 px-4 bg-gold text-navy rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
            >
              <FaSave />
              Save Changes
            </motion.button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="text-white/60 text-sm">Full Name</h4>
              <p className="text-white text-lg">
                {profileData.full_name || "Not set"}
              </p>
            </div>
            <div>
              <h4 className="text-white/60 text-sm">Bio</h4>
              <p className="text-white">{profileData.bio || "No bio added"}</p>
            </div>
            <div>
              <h4 className="text-white/60 text-sm">Location</h4>
              <p className="text-white">
                {profileData.location || "Not specified"}
              </p>
            </div>
            <div>
              <h4 className="text-white/60 text-sm">Phone Number</h4>
              <p className="text-white">
                {profileData.phone || "Not provided"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Add TripDetailsModal component
function TripDetailsModal({
  trip,
  isOpen,
  onClose,
}: {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!trip || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>

        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-navy shadow-xl rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              Trip to {trip.destination}
            </h3>
            <div className="flex gap-4">
              <PDFDownloadLink
                document={<TripPDF trip={trip} />}
                fileName={`${trip.destination
                  .toLowerCase()
                  .replace(/\s+/g, "-")}-itinerary.pdf`}
              >
                {({ loading }) => (
                  <button
                    className="luxury-button px-4 py-2 flex items-center gap-2"
                    disabled={loading}
                  >
                    <FaDownload />
                    {loading ? "Loading..." : "Download PDF"}
                  </button>
                )}
              </PDFDownloadLink>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar pr-4">
            {/* Trip Overview */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <FaCalendar className="text-gold" />
                  <div>
                    <p className="text-white/60 text-sm">Dates</p>
                    <p className="text-white">
                      {format(new Date(trip.start_date), "MMM d")} -{" "}
                      {format(new Date(trip.end_date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaWallet className="text-gold" />
                  <div>
                    <p className="text-white/60 text-sm">Budget</p>
                    <p className="text-white">{trip.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="text-gold" />
                  <div>
                    <p className="text-white/60 text-sm">Travelers</p>
                    <p className="text-white">{trip.travelers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Itinerary Details */}
            <div className="space-y-6">
              {trip.itinerary.itinerary.map((day: any, index: number) => (
                <div key={index} className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-xl font-semibold text-white mb-4">
                    Day {day.day}
                  </h4>
                  <div className="space-y-4">
                    {["morning", "afternoon", "evening"].map((time) => (
                      <div key={time}>
                        <h5 className="text-gold capitalize mb-2">{time}</h5>
                        <ul className="space-y-2">
                          {day[time].map((activity: string, i: number) => (
                            <li
                              key={i}
                              className="text-white/80 pl-4 border-l border-gold/30"
                            >
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update the TripsContent component
function TripsContent({ trips }: { trips: Trip[] }) {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-white">My Trips</h3>
        <p className="text-white/60">{trips.length} trips saved</p>
      </div>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-white group-hover:text-gold transition-colors">
                    {trip.destination}
                  </h4>
                  <p className="text-white/60 text-sm">
                    Created on{" "}
                    {format(new Date(trip.created_at), "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-white/80">
                  <FaCalendar className="text-gold" />
                  <span>
                    {format(new Date(trip.start_date), "MMM d")} -{" "}
                    {format(new Date(trip.end_date), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <FaUsers className="text-gold" />
                  <span>{trip.travelers}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <FaHotel className="text-gold" />
                  <span>{trip.accommodation}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <FaWallet className="text-gold" />
                  <span>{trip.budget}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedTrip(trip);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 py-2 px-4 bg-gold text-navy rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
                >
                  <FaEye />
                  View Details
                </motion.button>
                <PDFDownloadLink
                  document={<TripPDF trip={trip} />}
                  fileName={`${trip.destination
                    .toLowerCase()
                    .replace(/\s+/g, "-")}-itinerary.pdf`}
                  className="flex-1"
                >
                  {({ loading }) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      <FaDownload />
                      {loading ? "Loading..." : "Download"}
                    </motion.button>
                  )}
                </PDFDownloadLink>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/5 rounded-xl backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <FaMapMarkerAlt className="text-2xl text-gold" />
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">
            No trips yet
          </h4>
          <p className="text-white/60">
            Start planning your next adventure to see your trips here!
          </p>
        </div>
      )}

      {/* Trip Details Modal */}
      <TripDetailsModal
        trip={selectedTrip}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTrip(null);
        }}
      />
    </div>
  );
}

function SavedContent({ savedTrips }: { savedTrips: Trip[] }) {
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
