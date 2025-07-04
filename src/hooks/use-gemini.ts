// In your React component or custom hook
import { useMutation } from "@tanstack/react-query";
import { analyzeFood } from "@/lib/apis/gemini";
import { getPrompt, analyzeResponse } from "@/utils/analysis";

const useGemini = () => {
  const {
    mutate: getFoodAnalysis,
    data: foodAnalysis,
    isPending: isAnalyzingText,
  } = useMutation({
    mutationFn: async ({ foodName, servingSize }: Record<string, string>) => {
      const prompt = getPrompt(foodName, servingSize);
      const result = await analyzeFood(prompt);
      return analyzeResponse(result.response);
    },
  });

  return { getFoodAnalysis, foodAnalysis, isAnalyzingText };
};

export { useGemini };
