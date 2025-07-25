import { NutrientAnalysis } from "@/constants/analysis";
import { supabase } from "@/utils/supabase";

/* 
  Nutrient Analysis Per Day APIs 
*/
const getNutrientAnalysis = async (userId: string, createdAt: string) => {
  const { data, error } = await supabase
    .from("NutrientAnalysisPerDay")
    .select()
    .eq("userId", userId)
    .eq("createdAt", createdAt)
    .single();

  if (error) console.error("Error in fetching nutrient analysis:", error);
  return { data, error };
};

const createNutrientAnalysis = async (analysis: NutrientAnalysis) => {
  const { data, error } = await supabase
    .from("NutrientAnalysisPerDay")
    .insert(analysis)
    .select()
    .single();

  if (error) console.error("Error creating nutrient analysis:", error);
  return { data, error };
};

const updateNutrientAnalysis = async (analysis: Partial<NutrientAnalysis>) => {
  const { data, error } = await supabase
    .from("NutrientAnalysisPerDay")
    .update(analysis)
    .eq("userId", analysis.userId)
    .eq("createdAt", analysis.createdAt)
    .select()
    .single();

  if (error) console.error("Error creating nutrient analysis:", error);
  return { data, error };
};

export { getNutrientAnalysis, createNutrientAnalysis, updateNutrientAnalysis };
