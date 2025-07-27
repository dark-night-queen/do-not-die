// core dependencies
import React, { useState } from "react";
import { ScrollView } from "react-native";

// core components
import { VStack } from "@/components/ui";

// custom components
import DefaultLayout from "@/screens/_layout";
import { PersonalizedRecommendation } from "./_components/personalized-recommendation";
import { DailyReport } from "./_components/daily-report";
import { ScannerButton } from "./_components/scanner-button";
import { WeeklyCalendar } from "./_components/weekly-calendar";
import { MacroCard } from "./_components/macro-card";
import { MetricsCard } from "./_components/metrics-card";
import { RecentlyLoggedItem } from "./_components/recently-logged-item";
import { AddFoodModal } from "./_components/recently-logged-item/add-food-modal";

// handler functions
import { useGemini } from "@/hooks/use-gemini";
import { useCalendar } from "@/hooks/useCalendar";
import { useUserStore } from "@/store/useOnboardingStore";
import { useFoodAnalysisStore } from "@/store/useFoodAnalysisStore";
import { useNutrientAnalysisStore } from "@/store/useNutrientAnalysisStore";

// component logic
const HomeScreen = () => {
  const { user } = useUserStore();
  const { activeDate } = useCalendar();
  const { performFoodAnalysis, foodAnalysis } = useGemini();
  const { createFoodAnalysis, getFoodAnalysis } = useFoodAnalysisStore();
  const { addFoodItem } = useNutrientAnalysisStore();

  const [isAddFoodBtnDisabled, setIsAddFoodBtnDisabled] = useState(false);
  const [isAnalyzingText, setIsAnalyzingText] = useState(false);
  const [formData, setFormData] = useState({
    foodName: "",
    servingSize: "",
  });
  const [errors, setErrors] = useState({
    foodName: "",
    servingSize: "",
  });

  React.useEffect(() => {
    const hasEmptyField = !formData.foodName;
    setIsAddFoodBtnDisabled(hasEmptyField);
  }, [formData]);

  const refetchFoodAnalysis = React.useCallback(async () => {
    await getFoodAnalysis(user.id, activeDate);
  }, [getFoodAnalysis, user.id, activeDate]);

  React.useEffect(() => {
    const addFood = async () => {
      if (!foodAnalysis || !isAnalyzingText) return;

      const foodItem = {
        ...foodAnalysis,
        createdAt: activeDate.toISOString(),
        updatedAt: activeDate.toISOString(),
      };

      await createFoodAnalysis(user.id, foodItem);
      await refetchFoodAnalysis();
      await addFoodItem(user.id, foodItem);
      setIsAnalyzingText(false);
      closeModal();
    };

    addFood();
  }, [
    activeDate,
    addFoodItem,
    createFoodAnalysis,
    foodAnalysis,
    isAnalyzingText,
    refetchFoodAnalysis,
    user.id,
  ]);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setFormData({ foodName: "", servingSize: "" });
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddFood = async () => {
    setIsAnalyzingText(true);
    await performFoodAnalysis({
      foodName: formData.foodName,
      servingSize: formData.servingSize,
    });
  };

  return (
    <DefaultLayout className="p-0">
      <ScrollView>
        <VStack className="gap-4 p-6">
          <WeeklyCalendar />
          <MacroCard />
          <MetricsCard />
          <ScannerButton />
          <RecentlyLoggedItem
            openModal={openModal}
            refetch={refetchFoodAnalysis}
          />
          <DailyReport />
          <PersonalizedRecommendation />
        </VStack>
      </ScrollView>

      <AddFoodModal
        isDisabled={isAddFoodBtnDisabled}
        isAnalyzing={isAnalyzingText}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        showModal={showModal}
        onClose={closeModal}
        onSubmit={handleAddFood}
      />
    </DefaultLayout>
  );
};

export default HomeScreen;
