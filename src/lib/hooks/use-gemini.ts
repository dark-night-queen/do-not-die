// In your React component or custom hook
import { useMutation } from "@tanstack/react-query";
import { analyzeFood } from "@/src/apis/gemini";
import { getPrompt, analyzeResponse } from "@/utils/analysis";

const useGemini = () => {
  const {
    mutate: performFoodAnalysis,
    data: foodAnalysis,
    isPending: isAnalyzingText,
  } = useMutation({
    mutationFn: async ({ foodName, servingSize }: Record<string, string>) => {
      const prompt = getPrompt(foodName, servingSize);
      const result = await analyzeFood(prompt);
      return analyzeResponse(result.response);
    },
  });

  return { performFoodAnalysis, foodAnalysis, isAnalyzingText };
};

export { useGemini };
