import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { FoodAnalysis } from "@/constants/analysis";
import { getFoodAnalysis } from "@/src/apis/food-analysis";

import { useCalendar } from "@/hooks/useCalendar";
import { useFoodAnalysisStore } from "@/store/useFoodAnalysisStore";
import { useUserStore } from "@/store/useOnboardingStore";

type AnalysisContextType = {};

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined,
);
const useAnalysis = () => {
  const ctx = React.useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used within AnalysisProvider");
  return ctx;
};

const AnalysisProvider = ({ children }: React.PropsWithChildren) => {
  const { user } = useUserStore();
  const { activeDate } = useCalendar();
  const { createFoodAnalysis } = useFoodAnalysisStore();

  const [setFoodAnalysis] = React.useState<FoodAnalysis>({});
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const { data: foodAnalysis, refetch: getFoodAnalysisItems } = useQuery({
    queryKey: [],
    queryFn: async () => await getFoodAnalysis(user.id, activeDate),
  });

  const addFood = async (foodAnalysis: FoodAnalysis) => {
    if (!foodAnalysis || !isAnalyzing) return;

    const createdAt = activeDate.toISOString();

    const foodItem = { ...foodAnalysis, createdAt, updatedAt: createdAt };

    await createFoodAnalysis(user.id, foodItem);
    await refetchFoodAnalysis();
    await addFoodItem(user.id, foodItem);
    setIsAnalyzingText(false);
    closeModal();
  };

  return (
    <AnalysisContext.Provider value={{}}>{children}</AnalysisContext.Provider>
  );
};

export { AnalysisProvider, useAnalysis };
