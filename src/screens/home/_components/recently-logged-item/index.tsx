import React, { useState } from "react";
import { PenLine, RefreshCcw } from "lucide-react-native";
import { Button, ButtonIcon, HStack, Text, VStack } from "@/components/ui";
import { LoggedItem } from "./logged-item";
import { NoItemAvailable } from "./item-not-available";
import { AddFoodModal } from "./add-food-modal";
import { useGemini } from "@/hooks/use-gemini";

// TODO: add feature for images
// TODO: add feature for adding the items into database
// TODO: handle analyzing feature
export const RecentlyLoggedItem = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [foodItem, setFoodItem] = useState<Record<string, any>[]>([]);
  const [formData, setFormData] = useState({
    foodName: "",
    servingSize: "",
  });
  const [errors, setErrors] = useState({
    foodName: "",
    servingSize: "",
  });

  const { getFoodAnalysis, foodAnalysis, isAnalyzingText } = useGemini();

  React.useEffect(() => {
    console.log("foodAnalysis", isAnalyzingText, foodAnalysis);
    if (foodAnalysis) setFoodItem((prev) => [...prev, foodAnalysis]);
  }, [foodAnalysis]);

  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddFood = async () => {
    await getFoodAnalysis({
      foodName: formData.foodName,
      servingSize: formData.servingSize,
    });
    closeModal();
  };

  return (
    <VStack className="gap-4">
      <HStack className="items-center justify-between">
        <Text className="text-xl font-semibold">Recently uploaded</Text>

        <HStack className="gap-6">
          <Button onPress={() => {}} variant="link">
            <ButtonIcon as={RefreshCcw} size="xl" className="text-gray-400" />
          </Button>

          <Button onPress={openModal} variant="link">
            <ButtonIcon as={PenLine} size="xl" className="text-gray-400" />
          </Button>
        </HStack>
      </HStack>

      {!foodItem.length ? (
        <NoItemAvailable />
      ) : (
        foodItem.map((item, index) => (
          <LoggedItem
            key={index}
            name={item.name}
            calories={item.calories}
            score={item.nutritionScore}
            protein={item.protein}
            carbs={item.carbs}
            fat={item.fat}
            timestamp={""}
          />
        ))
      )}

      <AddFoodModal
        isAnalyzing={isAnalyzingText}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        showModal={showModal}
        onClose={closeModal}
        onSubmit={handleAddFood}
      />
    </VStack>
  );
};
