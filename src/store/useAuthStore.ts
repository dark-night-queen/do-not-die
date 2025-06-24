import { create } from "zustand";
import { AuthError, Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { baseUrl } from "../constants";

interface AuthSession {
  session: Session | null;
  getSession: () => Promise<{
    data: { session: Session | null };
    error: AuthError | null;
  }>;
  setSession: (session: Session | null) => void;
  onAuthStateChange: (callback: (session: Session | null) => void) => void;
}

interface AuthActions {
  login: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: any }>;
  signup: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: any }>;
  logout: () => void;
  forgetPassword: (email: string) => Promise<{ data: any; error: any }>;
}

export const useAuthStore = create<AuthSession & AuthActions>((set, get) => ({
  session: null, // Replace with actual session type if available

  getSession: async () => {
    if (get().session) {
      return { data: { session: get().session }, error: null };
    }

    const { data, error } = await supabase.auth.getSession();
    get().setSession(data.session);
    return { data, error };
  },
  setSession: (session) => set({ session }),
  onAuthStateChange: (callback) => {
    supabase.auth.onAuthStateChange((_event, session) => {
      get().setSession(session);
      callback(session);
    });
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    return { data, error };
  },
  signup: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    return { data, error };
  },
  forgetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/reset-password`,
    });

    return { data, error };
  },
  logout: async () => {
    await supabase.auth.signOut().then(() => {
      get().setSession(null);
    });
  },
}));
