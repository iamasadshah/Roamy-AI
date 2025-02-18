"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogin = () => {
    router.push("/auth");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 bg-navy/80 ${
        isScrolled ? "bg-navy/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-navy/80">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/favicon.png"
              alt="Roamy AI"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-white hover:text-gold transition-colors"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-white hover:text-gold transition-colors"
            >
              Features
            </Link>
            <Link
              href="/goals"
              className="text-white hover:text-gold transition-colors"
            >
              Goals
            </Link>
            {!loading &&
              (user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-white hover:text-gold transition-colors">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gold">
                      <Image
                        src={user.user_metadata?.avatar_url || DEFAULT_AVATAR}
                        alt="Profile"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = DEFAULT_AVATAR;
                        }}
                      />
                    </div>
                    <span className="group-hover:text-gold transition-colors">
                      {user.user_metadata?.full_name?.split(" ")[0] ||
                        "Profile"}
                    </span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-navy/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-white hover:text-gold hover:bg-white/5 transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white hover:text-gold hover:bg-white/5 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="luxury-button text-sm px-6 py-2"
                >
                  Sign In
                </button>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy/95 backdrop-blur-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-4">
              {!loading &&
                (user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block text-white hover:text-gold transition-colors py-2"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsOpen(false);
                    }}
                    className="luxury-button text-sm px-6 py-2 w-full"
                  >
                    Sign In
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
