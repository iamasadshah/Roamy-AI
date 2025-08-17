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



const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  closed: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

const menuItems = [
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setIsDropdownOpen(false);
    router.refresh();
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsDropdownOpen(false);
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
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50" 
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
                      ? 'text-gray-700 hover:text-blue-800'
                      : 'text-gray-700 hover:text-blue-800'
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
                  <button 
                    className="flex items-center space-x-2 focus:outline-none group"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:ring-2 group-hover:ring-blue-500 transition-all duration-200 cursor-pointer">
                      <Image
                        src={user.user_metadata?.avatar_url || DEFAULT_AVATAR}
                        alt="User Avatar"
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className={`font-medium ${isScrolled || !isHome ? 'text-gray-700' : 'text-indigo-600'}`}>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown className={`text-xs transition-colors duration-200 ${isScrolled || !isHome ? 'text-gray-500' : 'text-indigo-600'}`} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                  <motion.div 
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-white/95 backdrop-blur-sm border border-gray-200/50 py-2 z-50 overflow-hidden"
                      >
                        <button
                          onClick={handleProfileClick}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center transition-colors duration-200"
                        >
                          <FaUser className="mr-3 text-blue-500" />
                          Profile
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 flex items-center transition-colors duration-200"
                    >
                          <FaSignOutAlt className="mr-3 text-red-500" />
                      Sign out
                    </button>
                  </motion.div>
                    )}
                  </AnimatePresence>
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
              <motion.button
                onClick={handleProfileClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={user.user_metadata?.avatar_url || DEFAULT_AVATAR}
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.button>
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

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "100vh",
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 backdrop-blur-xl lg:hidden pt-20"
          >
            <div className="flex flex-col items-center justify-start h-full p-6 space-y-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-800 hover:text-blue-600 transition-colors font-medium tracking-wide text-center py-3 px-6 rounded-xl hover:bg-white/50 backdrop-blur-sm"
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
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="pt-6 border-t border-gray-200/50 w-full flex flex-col items-center"
                >
                  {user ? (
                    <div className="flex flex-col items-center space-y-6 w-full">
                      <motion.button
                        onClick={() => {
                          handleProfileClick();
                          setIsOpen(false);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <Image
                          src={user.user_metadata?.avatar_url || DEFAULT_AVATAR}
                          alt="User Avatar"
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
                        </div>
                      </motion.button>
                      
                      <div className="text-center">
                        <h3 className="text-gray-800 text-lg font-semibold">
                          {user.user_metadata?.full_name || "Welcome"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {user.email}
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-3 w-full max-w-xs">
                        <motion.button
                          onClick={() => {
                            handleProfileClick();
                            setIsOpen(false);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FaUser className="h-4 w-4" />
                          View Profile
                        </motion.button>
                        
                        <motion.button
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200"
                        >
                          <FaSignOutAlt className="h-4 w-4" />
                          Sign Out
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => {
                        handleLogin();
                        setIsOpen(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                    >
                      Sign In
                    </motion.button>
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
