import { FoodAnalysis } from "@/constants/analysis";
import { supabase } from "@/utils/supabase";

/* 
  Food Analysis Per Day APIs 
*/
const getFoodAnalysis = async (userId: string, createdAt: string) => {
  const { data, error } = await supabase
    .from("FoodItem")
    .select()
    .eq("userId", userId)
    .eq("createdAt", createdAt);

  if (error) console.error("Error in fetching food analysis:", error);
  return { data, error };
};

const createFoodAnalysis = async (food: FoodAnalysis) => {
  const { data, error } = await supabase
    .from("FoodItem")
    .insert(food)
    .select()
    .single();

  if (error) console.error("Error creating food analysis:", error);
  return { data, error };
};

export { getFoodAnalysis, createFoodAnalysis };
