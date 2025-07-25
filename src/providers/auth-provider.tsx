// core dependencies
import React, { createContext } from "react";

// handler functions
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useOnboardingStore";
import { Session } from "@supabase/supabase-js";
import { User } from "@/constants/user";

type AuthContextType = {
  login: (
    email: string,
    password: string,
  ) => Promise<{ data: any; error: any }>;
  signup: (email: string, password: string) => Promise<void>;
  forgetPassword: (email: string) => Promise<{ data: any; error: any }>;
  resetPassword: (password: string) => Promise<{ data: any; error: any }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const {
    onAuthStateChange,
    login,
    signup,
    forgetPassword,
    resetPassword,
    logout,
  } = useAuthStore();
  const { createUser, setUser } = useUserStore();

  const handleSessionChange = React.useCallback(
    async (session: Session | null) => {
      if (session) {
        if (!session.user) {
          console.error("No user found in session");
          return;
        }
      }
    },
    [],
  );

  React.useEffect(() => {
    // getSession();
    onAuthStateChange(handleSessionChange);
  }, [handleSessionChange, onAuthStateChange]);

  const createNewUser = async (session: Session) => {
    const user: User = {
      id: session.user.id,
      email: session.user.email ?? "",
    };

    const { data, error } = await createUser(user);
    if (error) return console.error("Error creating user:", error);

    const newUser: User = data[0];
    setUser(newUser);
    return newUser.id;
  };

  const onSignup = async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await signup(email, password);
    if (error) {
      console.error("Signup error:", error);
      throw error.message;
    }

    await createNewUser(session);
  };

  return (
    <AuthContext.Provider
      value={{ signup: onSignup, login, resetPassword, forgetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
