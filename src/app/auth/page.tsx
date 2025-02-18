"use client";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AuthPage() {
  const [view, setView] = useState<"sign_in" | "sign_up">("sign_in");
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Get the current site URL dynamically
    const siteUrl = window.location.origin;
    setRedirectUrl(`${siteUrl}/auth/callback`);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy to-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Image
            src="/favicon.png"
            alt="Roamy AI"
            width={80}
            height={80}
            className="mx-auto rounded-2xl"
          />
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">
            Welcome to Roamy AI
          </h1>
          <p className="text-white/60">Your personal AI travel planner</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setView("sign_in")}
              className={`px-6 py-2 rounded-lg transition-colors ${
                view === "sign_in"
                  ? "bg-gold text-navy"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setView("sign_up")}
              className={`px-6 py-2 rounded-lg transition-colors ${
                view === "sign_up"
                  ? "bg-gold text-navy"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Sign Up
            </button>
          </div>

          <Auth
            supabaseClient={supabase}
            view={view}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#0a4d93",
                    brandAccent: "#4c8bbe",
                  },
                },
              },
              className: {
                container: "!bg-transparent",
                button: "!bg-gold !text-navy hover:!bg-gold/90",
                input: "!bg-white/10 !border-white/20 !text-white",
                label: "!text-white",
              },
            }}
            theme="dark"
            providers={["google", "github"]}
            redirectTo={redirectUrl}
          />
        </div>
      </motion.div>
    </div>
  );
}
