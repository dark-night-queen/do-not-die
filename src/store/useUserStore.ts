import { create } from "zustand";
import { supabase } from "@/utils/supabase";

export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;

  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
};

interface UserState {
  user: User | null;
}
interface UserActions {
  getUser: (id: string) => Promise<User | null>;
  setUser: (user: User | null) => void;
  createUser: (user: User) => Promise<{ data: any; error: any }>;
  updateUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserState & UserActions>((set, get) => ({
  user: null,

  getUser: async (id) => {
    const { user, setUser } = get();
    if (user?.id === id) return user;

    const { data, error } = await supabase.from("User").select().eq("id", id);

    if (error) console.error("Error fetching user:", error);

    const newUser = data?.[0];
    if (newUser) setUser(newUser);
    return newUser || null;
  },
  setUser: (user) => {
    set({ user });
  },
  createUser: async (user) => {
    const { data, error } = await supabase
      .from("User")
      .insert({
        id: user.id,
        email: user.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        avatar: user?.avatar,
      })
      .select();

    return { data, error };
  },
  updateUser: (user) => {
    //   set((state) => ({
    //     user: { ...state.user, ...user },
    //   }));
  },
}));
