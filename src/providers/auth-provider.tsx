import React, { createContext } from "react";
import { useRouter } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore, User } from "@/store/useUserStore";
import { useProfileStore, Profile } from "@/store/useOnboardingStore";

// TODO: Fix this
const AuthContext = createContext({
  signup: (email: string, password: string) => {},
});
const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  const { createUser, setUser, getUser } = useUserStore();
  const { createProfile, setProfile, getProfile } = useProfileStore();
  const { signup, getSession, onAuthStateChange } = useAuthStore();

  const handleSessionChange = async (session: Session | null) => {
    if (session) {
      getUser(session.user.id);
      const profile = await getProfile(session.user.id);

      if (profile?.isOnboardingComplete) {
        router.push("/(tabs)");
      } else {
        router.push("/(auth)/onboarding");
      }
    }
  };

  React.useEffect(() => {
    getSession();
    onAuthStateChange(handleSessionChange);
  }, []);

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

  const createNewProfile = async (userId: string) => {
    const { data, error } = await createProfile(userId);

    if (error) return console.error("Error creating user's profile:", error);
    setProfile(data[0] as Profile);
  };

  const handleNewSession = async (session: Session) => {
    const userId = await createNewUser(session);
    if (!userId) return;
    createNewProfile(userId);
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

    handleNewSession(session);
  };

  return (
    <AuthContext.Provider value={{ signup: onSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, useAuthStore, AuthContext, AuthProvider };
