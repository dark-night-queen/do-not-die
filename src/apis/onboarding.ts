import type { User, Profile } from "@/constants/user";
import { supabase } from "@/utils/supabase";

/* 
  User APIs 
*/
const getUser = async (id: string) => {
  const { data, error } = await supabase
    .from("User")
    .select()
    .eq("id", id)
    .single();

  if (error) console.error("Error fetching user:", error);
  return { data, error };
};

const createUser = async (user: User) => {
  const { data, error } = await supabase
    .from("User")
    .insert({
      id: user.id,
      email: user.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      avatar: user?.avatar,
    })
    .select()
    .single();

  if (error) console.error("Error creating user:", error);
  return { data, error };
};

const updateUser = async (user: Partial<User>) => {
  const { data, error } = await supabase
    .from("User")
    .update(user)
    .eq("id", user.id)
    .select()
    .single();

  if (error) console.error("Error updating user:", error);
  return { data, error };
};

/* 
  Profile APIs 
*/
const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("Profile")
    .select()
    .eq("userId", userId);

  if (error) console.error("Error fetching profile:", error);
  return { data: data?.[0] || null, error };
};

const createProfile = async (profile: Profile) => {
  const { data, error } = await supabase
    .from("Profile")
    .insert(profile)
    .select()
    .single();

  if (error) console.error("Error creating profile:", error);
  return { data: data, error };
};

const updateProfile = async (profile: Partial<Profile>) => {
  const { data, error } = await supabase
    .from("Profile")
    .update(profile)
    .eq("userId", profile.userId)
    .select()
    .single();

  if (error) console.error("Error updating profile:", error);
  return { data: data, error };
};

const resetOnboarding = async (profile: Partial<Profile>) => {
  await updateProfile(profile);
};

export {
  getUser,
  createUser,
  updateUser,
  getProfile,
  createProfile,
  updateProfile,
  resetOnboarding,
};
