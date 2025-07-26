import { NutrientAnalysis } from "@/constants/analysis";
import { supabase } from "@/utils/supabase";

/* 
  Nutrient Analysis Per Day APIs 
*/
const getNutrientAnalysis = async (userId: string, createdAt: string) => {
  /* !* Haven't use single(), b/c in case of no data, it will throw an error */
  const { data, error } = await supabase
    .from("NutrientAnalysisPerDay")
    .select()
    .eq("userId", userId)
    .eq("createdAt", createdAt);

  if (error) console.error("Error in fetching nutrient analysis:", error);
  return { data: data?.[0] ?? null, error };
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
