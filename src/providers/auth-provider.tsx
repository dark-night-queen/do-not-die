import React, { createContext } from "react";
import { useRouter } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore, User } from "@/store/useUserStore";
import {
  useProfileStore,
  useActivityStore,
  useGoalStore,
} from "@/store/useOnboardingStore";

// TODO: Fix this
const AuthContext = createContext({
  signup: (email: string, password: string) => {},
});
const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  const { signup, session, getSession, onAuthStateChange } = useAuthStore();
  const { createUser, setUser, getUser } = useUserStore();
  const { profile, getProfile } = useProfileStore();
  const { getGoal } = useGoalStore();
  const { getActivity } = useActivityStore();

  const handleSessionChange = async (session: Session | null) => {
    if (session) {
      if (!session.user) {
        console.error("No user found in session");
        return;
      }
      await getUser(session.user.id);
      const profile = await getProfile(session.user.id);

      if (profile?.id) {
        getGoal(profile.id);
        getActivity(profile.id);
      }
    } else {
      router.push("/auth");
    }
  };

  React.useEffect(() => {
    // getSession();
    onAuthStateChange(handleSessionChange);
  }, []);

  React.useEffect(() => {
    if (session) {
      if (profile?.isOnboardingComplete) {
        router.push("/(tabs)");
      } else {
        router.push("/auth/onboarding");
      }
    }
  }, [profile]);

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
    <AuthContext.Provider value={{ signup: onSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, useAuthStore, AuthContext, AuthProvider };
