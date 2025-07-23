import { create } from "zustand";
import { AuthError, Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { baseUrl } from "@/src/lib/constants";

interface AuthSession {
  session: Session | null;
  redirected: boolean;
  getSession: () => Promise<{
    data: { session: Session | null };
    error: AuthError | null;
  }>;
  onAuthStateChange: (callback: (session: Session | null) => void) => void;
  setRedirected: (setRedirected: boolean) => void;
}

interface AuthActions {
  login: (
    email: string,
    password: string,
  ) => Promise<{ data: any; error: any }>;
  signup: (
    email: string,
    password: string,
  ) => Promise<{ data: any; error: any }>;
  logout: () => Promise<void>;
  forgetPassword: (email: string) => Promise<{ data: any; error: any }>;
  resetPassword: (password: string) => Promise<{ data: any; error: any }>;
}

export const useAuthStore = create<AuthSession & AuthActions>((set, get) => ({
  session: null,
  redirected: false,

  getSession: async () => {
    if (get().session) {
      return { data: { session: get().session }, error: null };
    }

    const { data, error } = await supabase.auth.getSession();
    set({ session: data.session });
    return { data, error };
  },
  onAuthStateChange: (callback) => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      set({ session, redirected: false });
      await callback(session);
    });
  },

  setRedirected: (redirected) => set({ redirected }),

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
    await supabase.auth.signOut();
    set({ session: null, redirected: false });
  },
  resetPassword: async (password) => {
    const { data, error } = await supabase.auth.updateUser({ password });
    return { data, error };
  },
}));
