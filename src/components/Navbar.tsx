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

const menuItems = [
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/goals", label: "Goals" },
];

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
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    router.refresh();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? " backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0148A9]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-50">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <Image
                src="/favicon.png"
                alt="Roamy AI"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-white font-semibold text-xl hidden sm:block">
                Roamy AI
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-gold transition-all duration-200 text-sm font-medium tracking-wide"
              >
                {item.label}
              </Link>
            ))}
            {!loading &&
              (user ? (
                <div className="relative group">
                  <motion.button
                    className="flex items-center space-x-3 text-white group bg-white/10 rounded-full px-4 py-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gold/50 group-hover:border-gold transition-all duration-200">
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
                    <span className="group-hover:text-gold transition-colors text-sm font-medium">
                      {user.user_metadata?.full_name?.split(" ")[0] ||
                        "Profile"}
                    </span>
                  </motion.button>

                  <div className="absolute right-0 mt-2 w-48 py-2 bg-navy/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-white hover:text-gold hover:bg-white/5 transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:text-gold hover:bg-white/5 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <motion.button
                  onClick={handleLogin}
                  className="luxury-button text-sm px-2 py-1 font-medium tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white p-2 relative z-50 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "100vh",
              transition: { duration: 0.3 },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.3 },
            }}
            className="fixed inset-0 bg-navy/98 backdrop-blur-xl lg:hidden pt-20"
          >
            <div className="flex flex-col items-center justify-start h-full p-6 space-y-8 bg-[#0148A9]">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-white hover:text-gold transition-colors font-medium tracking-wide"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {!loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="pt-4 border-t border-white/10 w-full flex flex-col items-center"
                >
                  {user ? (
                    <div className="flex flex-col items-center space-y-6">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold">
                        <Image
                          src={user.user_metadata?.avatar_url || DEFAULT_AVATAR}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-white text-lg font-medium">
                        {user.user_metadata?.full_name || "Profile"}
                      </span>
                      <div className="flex flex-col space-y-3 w-full">
                        <Link
                          href="/profile"
                          onClick={() => setIsOpen(false)}
                          className="luxury-button text-sm px-6 py-2.5 text-center"
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-white hover:text-gold transition-colors text-sm font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="luxury-button text-sm px-4 py-1"
                    >
                      Sign In
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
