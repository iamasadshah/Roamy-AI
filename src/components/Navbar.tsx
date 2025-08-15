"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";

// Animation variants
const navItemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }),
  hover: {
    y: -2,
    transition: { duration: 0.2 }
  }
};

const mobileMenuVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { 
      type: 'spring', 
      bounce: 0.1,
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  closed: { 
    opacity: 0,
    y: -20,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const mobileItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

const menuItems = [
  { href: "/plan", label: "Plan Trip" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
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

  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHome 
          ? "bg-white/90 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-50">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/favicon.png"
                  alt="Roamy AI"
                  fill
                  className="rounded-lg object-contain"
                  priority
                />
              </div>
              <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 ${isScrolled || !isHome ? 'block' : 'hidden sm:block'}`}>
                Roamy AI
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.href}
                custom={i + 1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative group"
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isScrolled || !isHome
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'hover:text-blue-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              custom={menuItems.length + 1}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              className="ml-4"
            >
              {loading ? (
                <div className="w-24 h-9 bg-gray-200 rounded-lg animate-pulse"></div>
              ) : user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none group">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:ring-2 group-hover:ring-blue-500 transition-all duration-200">
                      <Image
                        src={user.user_metadata?.avatar_url || DEFAULT_AVATAR}
                        alt="User Avatar"
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className={`font-medium ${isScrolled || !isHome ? 'text-gray-700' : 'text-white'}`}>
                      {user.email?.split('@')[0]}
                    </span>
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${isScrolled || !isHome ? 'text-gray-500' : 'text-white/80'}`} />
                  </button>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0, y: 10, pointerEvents: 'none' }}
                    whileHover={{ opacity: 1, y: 0, pointerEvents: 'auto' }}
                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white/95 backdrop-blur-sm border border-gray-100 py-1 z-50 overflow-hidden"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <FaUser className="mr-3 text-gray-500" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-200"
                    >
                      <FaSignOutAlt className="mr-3 text-gray-500" />
                      Sign out
                    </button>
                  </motion.div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  Get Started
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="lg:hidden flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {!loading && user && (
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={user.user_metadata?.avatar_url || DEFAULT_AVATAR}
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isScrolled || !isHome ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/10 hover:bg-white/20'
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className={`h-5 w-5 ${isScrolled || !isHome ? 'text-gray-800' : 'text-white'}`} />
              ) : (
                <FaBars className={`h-5 w-5 ${isScrolled || !isHome ? 'text-gray-800' : 'text-white'}`} />
              )}
            </motion.button>
          </motion.div>
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
                  {/* Mobile menu button */}
                  {user ? (
                    <div className="flex flex-col items-center space-y-6">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={user.user_metadata?.avatar_url || DEFAULT_AVATAR}
                          alt="User Avatar"
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-white text-lg font-medium">
                        {user.user_metadata?.full_name || "Profile"}
                      </span>
                      <div className="flex flex-col space-y-3 w-full">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="luxury-button text-sm px-6 py-2.5 text-center"
                        >
                          Dashboard
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
    </motion.nav>
  );
}
