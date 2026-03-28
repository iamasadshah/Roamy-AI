"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClientComponentClient, type User } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { nanoid } from "nanoid";
import { FaArrowUp } from "react-icons/fa";
import { requestWithRetry } from "@/shared/lib/requestWithRetry";

const STORAGE_PREFIX = "roamy-chat-threads";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type ChatThread = {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
};

const promptRows = [
  ["Plan a 5-day Italy trip with food and art", "Build a weekend escape from Dubai"],
  ["Create a budget-friendly Japan itinerary", "Design a romantic Paris honeymoon"],
];

export default function HomeChat() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<ChatThread[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const siteUrl = window.location.origin;
    setRedirectUrl(`${siteUrl}/auth/callback`);
  }, []);

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return;
      setUser(data.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setShowLogin(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  useEffect(() => {
    if (!user) {
      setChats([]);
      setActiveChatId(null);
      return;
    }
    const stored = window.localStorage.getItem(storageKey(user.id));
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChatThread[];
        setChats(parsed);
        setActiveChatId(parsed[0]?.id ?? null);
      } catch {
        setChats([]);
        setActiveChatId(null);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    window.localStorage.setItem(storageKey(user.id), JSON.stringify(chats));
  }, [chats, user]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [activeChatId, chats]);

  const activeChat = useMemo(() => {
    if (!activeChatId) return chats[0] ?? null;
    return chats.find((chat) => chat.id === activeChatId) ?? chats[0] ?? null;
  }, [activeChatId, chats]);

  const emptyState = !activeChat || activeChat.messages.length === 0;

  const handleNewChat = useCallback(() => {
    const newChat: ChatThread = {
      id: nanoid(),
      title: "New chat",
      messages: [],
      updatedAt: new Date().toISOString(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  }, []);

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const upsertChat = useCallback(
    (chatId: string, updater: (chat: ChatThread) => ChatThread) => {
      setChats((prev) => {
        const existing = prev.find((chat) => chat.id === chatId);
        const updated = updater(
          existing ?? {
            id: chatId,
            title: "New chat",
            messages: [],
            updatedAt: new Date().toISOString(),
          },
        );
        const without = prev.filter((chat) => chat.id !== chatId);
        return [updated, ...without];
      });
    },
    [],
  );

  const sendMessage = useCallback(
    async (messageOverride?: string) => {
      const trimmed = (messageOverride ?? input).trim();
      if (!trimmed || isResponding) return;

      if (!user) {
        setPendingMessage(trimmed);
        setShowLogin(true);
        return;
      }

      const chatId = activeChat?.id ?? nanoid();
      if (!activeChat) {
        setActiveChatId(chatId);
      }

      const userMessage: ChatMessage = {
        id: nanoid(),
        role: "user",
        content: trimmed,
      };

      setInput("");
      setIsResponding(true);

      upsertChat(chatId, (chat) => {
        const nextTitle = chat.title === "New chat" ? shortTitle(trimmed) : chat.title;
        return {
          ...chat,
          title: nextTitle,
          messages: [...chat.messages, userMessage],
          updatedAt: new Date().toISOString(),
        };
      });

      try {
        const conversation = getConversation(chatId, trimmed, activeChat);
        const response = await requestWithRetry(() =>
          fetch("/api/travel-chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: conversation }),
          }),
        );
        const data = await response.json();
        const assistantMessage: ChatMessage = {
          id: nanoid(),
          role: "assistant",
          content: data.reply ?? "I could not generate a response.",
        };

        upsertChat(chatId, (chat) => ({
          ...chat,
          messages: [...chat.messages, assistantMessage],
          updatedAt: new Date().toISOString(),
        }));
      } catch {
        const assistantMessage: ChatMessage = {
          id: nanoid(),
          role: "assistant",
          content: "I am having trouble responding right now. Please try again shortly.",
        };
        upsertChat(chatId, (chat) => ({
          ...chat,
          messages: [...chat.messages, assistantMessage],
          updatedAt: new Date().toISOString(),
        }));
      } finally {
        setIsResponding(false);
      }
    },
    [activeChat, input, isResponding, upsertChat, user],
  );

  useEffect(() => {
    if (!user || !pendingMessage) return;
    void sendMessage(pendingMessage);
    setPendingMessage(null);
  }, [pendingMessage, sendMessage, user]);

  return (
    <div className="relative min-h-screen bg-cream text-brand-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(66,122,161,0.18)_1px,transparent_1px)] bg-[length:24px_24px] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,71,137,0.08),_transparent_60%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen pt-24">
        {user && (
          <aside className="hidden w-[260px] flex-none border-r border-brand-900/10 bg-white/80 backdrop-blur md:flex">
            <div className="flex h-full flex-col">
              <div className="border-b border-brand-900/10 px-4 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
                    Chats
                  </h2>
                  <button
                    type="button"
                    onClick={handleNewChat}
                    className="rounded-full border border-brand-900/10 bg-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-900 transition hover:border-brand-900/30"
                  >
                    New
                  </button>
                </div>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4 text-sm">
                {chats.length ? (
                  chats.map((chat) => (
                    <button
                      key={chat.id}
                      type="button"
                      onClick={() => handleSelectChat(chat.id)}
                      className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                        chat.id === activeChat?.id
                          ? "border-brand-500 bg-brand-500/10 text-brand-900"
                          : "border-brand-900/10 bg-white/70 text-brand-900/70 hover:border-brand-500/40"
                      }`}
                    >
                      <p className="truncate font-medium">{chat.title}</p>
                    </button>
                  ))
                ) : (
                  <p className="rounded-xl border border-brand-900/10 bg-white/70 px-3 py-3 text-xs text-brand-900/60">
                    Start a chat to see it here.
                  </p>
                )}
              </div>
            </div>
          </aside>
        )}

        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto" ref={scrollRef}>
            {emptyState ? (
              <div className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl text-center">
                  <h1 className="text-3xl font-display font-semibold tracking-tight text-brand-900 sm:text-4xl md:text-5xl">
                    What trip do you want to create?
                  </h1>
                  <p className="mt-3 text-sm text-brand-900/70 sm:text-base">
                    Create a personalized itinerary with one simple message.
                  </p>

                  <div className="mt-8 rounded-3xl border border-brand-900/10 bg-white/80 px-5 py-6 text-left shadow-[0_22px_50px_rgba(6,71,137,0.12)] backdrop-blur">
                    <div className="relative">
                      <textarea
                        placeholder="Tell us about your trip"
                        rows={5}
                        aria-label="Describe your trip"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            void sendMessage();
                          }
                        }}
                        className="w-full resize-none bg-transparent pr-12 text-sm text-brand-900 placeholder:text-brand-900/40 focus:outline-none sm:text-base"
                      />
                      <button
                        className="absolute bottom-3 right-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-cream shadow-sm disabled:cursor-not-allowed disabled:bg-brand-500/60"
                        aria-label="Send prompt"
                        type="button"
                        onClick={() => void sendMessage()}
                        disabled={!input.trim() || isResponding}
                      >
                        <FaArrowUp className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-sm text-brand-900/70">
                    {promptRows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className={`grid gap-4 sm:grid-cols-2 sm:gap-8 ${
                          rowIndex > 0 ? "border-t border-brand-900/10 pt-4" : ""
                        }`}
                      >
                        {row.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => setInput(prompt)}
                            className="w-full text-left transition hover:text-brand-900"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  <p className="mt-14 text-xs text-brand-900/50">
                    By messaging us, you agree to our Terms of Use and confirm you&apos;ve read our
                    Privacy Policy.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
                {activeChat?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm sm:text-base ${
                        message.role === "user"
                          ? "bg-brand-900 text-cream"
                          : "border border-brand-900/10 bg-white/80 text-brand-900"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isResponding && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-brand-900/10 bg-white/80 px-5 py-4 text-sm text-brand-900/70">
                      Roamy is typing...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {!emptyState && (
            <div className="border-t border-brand-900/10 bg-cream/80 backdrop-blur">
              <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2xl border border-brand-900/10 bg-white/80 px-5 py-4 shadow-[0_18px_40px_rgba(6,71,137,0.1)] backdrop-blur">
                  <textarea
                    placeholder="Tell Roamy what you want to plan..."
                    rows={2}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void sendMessage();
                      }
                    }}
                    className="w-full resize-none bg-transparent pr-12 text-sm text-brand-900 placeholder:text-brand-900/40 focus:outline-none sm:text-base"
                  />
                  <button
                    className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-cream shadow-sm disabled:cursor-not-allowed disabled:bg-brand-500/60"
                    aria-label="Send prompt"
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={!input.trim() || isResponding}
                  >
                    <FaArrowUp className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-center text-xs text-brand-900/50">
                  Roamy responds to travel-only questions and itinerary requests.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-brand-900/10 bg-white p-6 shadow-[0_30px_80px_rgba(6,71,137,0.25)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
                  Sign in
                </p>
                <h2 className="mt-2 text-xl font-display font-semibold text-brand-900">
                  Continue with Roamy AI
                </h2>
                <p className="mt-2 text-sm text-brand-900/60">
                  Sign in to send messages and keep your chats saved.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="rounded-full border border-brand-900/10 px-3 py-1 text-xs font-semibold text-brand-900/60"
              >
                Close
              </button>
            </div>

            <div className="mt-6">
              <Auth
                supabaseClient={supabase}
                onlyThirdPartyProviders={true}
                redirectTo={redirectUrl}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#064789",
                        brandAccent: "#427aa1",
                        inputBackground: "#ffffff",
                        inputBorder: "#d6e3f1",
                        inputText: "#064789",
                        inputLabelText: "#427aa1",
                        anchorTextColor: "#064789",
                        anchorTextHoverColor: "#427aa1",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}:${userId}`;
}

function shortTitle(message: string) {
  const singleLine = message.split("\n")[0];
  return singleLine.length > 40 ? `${singleLine.slice(0, 40)}...` : singleLine;
}

type ConversationMessage = {
  role: "assistant" | "user";
  content: string;
};

function getConversation(
  chatId: string,
  latestUserMessage: string,
  activeChat: ChatThread | null,
): ConversationMessage[] {
  const base = activeChat?.id === chatId ? activeChat.messages : [];
  const history = base.map((message) => ({ role: message.role, content: message.content }));
  history.push({ role: "user", content: latestUserMessage });
  return history;
}
