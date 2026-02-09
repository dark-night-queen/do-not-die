import { create } from "zustand";
import { supabase } from "@/lib/utils/supabase";
import { Session } from "@supabase/supabase-js";

interface AuthSession {
  session: Session | null;
  initialized: boolean; // Add this to track if we've checked the initial session
}

interface AuthActions {
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signup: (email: string, password: string) => Promise<{ data: any; error: any }>;
  logout: () => Promise<void>;
  forgetPassword: (email: string) => Promise<{ data: any; error: any }>;
  resetPassword: (password: string) => Promise<{ data: any; error: any }>;
}

export const useAuthStore = create<AuthSession & AuthActions>((set, get) => ({
  session: null,
  initialized: false,

  initialize: async () => {
    const { data } = await supabase.auth.getSession();
    set({ session: data.session, initialized: true });

    // Listen for changes (Login/Logout/Token Refresh)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
    });
  },

  login: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signup: async (email, password) => {
    return await supabase.auth.signUp({ email, password });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ session: null });
  },
  forgetPassword: async (email) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${globalThis.location.origin}/reset-password`,
    });
  },
  resetPassword: async (password) => {
    return await supabase.auth.updateUser({ password });
  },
}));
