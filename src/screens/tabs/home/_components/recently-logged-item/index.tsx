// core dependencies
import React from "react";
import { MotiView } from "moti";
import { Pressable } from "react-native";
import { PenLine, RefreshCcw } from "lucide-react-native";

// core components
import { Button, ButtonIcon, HStack, Text, VStack } from "@/components/ui";

// custom components
import { NoItemAvailable } from "./item-not-available";
import { LoggedItem } from "./logged-item";
import { FoodDetail } from "./food-detail";

// constants
import { FoodAnalysis } from "@/constants/analysis";

// handler functions
import { useFoodAnalysisStore } from "@/store/useFoodAnalysisStore";

interface IRecentlyLoggedItemProps {
  openModal: () => void;
  refetch: () => Promise<void>;
}

// TODO: add feature for images
// component logic
export const RecentlyLoggedItem = ({
  openModal,
  refetch,
}: IRecentlyLoggedItemProps) => {
  const { foodAnalysis } = useFoodAnalysisStore();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const [showDrawer, setShowDrawer] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<FoodAnalysis | null>(
    null,
  );

  const openDrawer = (selectedItem: FoodAnalysis) => () => {
    setShowDrawer(true);
    setSelectedItem(selectedItem);
  };
  const closeDrawer = () => setShowDrawer(false);

  return (
    <VStack className="gap-4">
      <HStack className="items-center justify-between">
        <Text className="text-xl font-semibold">Recently uploaded</Text>

        <HStack className="gap-6">
          <Button
            onPress={async () => {
              if (!isAnimating) {
                setIsAnimating(true);
                await refetch();
                await setTimeout(() => setIsAnimating(false), 1500);
              }
            }}
            variant="link"
            disabled={isAnimating}
          >
            <MotiView
              animate={{
                rotateZ: isAnimating ? "360deg" : "0deg",
              }}
              transition={{
                type: "timing",
                duration: 600,
              }}
            >
              <ButtonIcon as={RefreshCcw} size="xl" className="text-gray-400" />
            </MotiView>
          </Button>
          <Button onPress={openModal} variant="link">
            <ButtonIcon as={PenLine} size="xl" className="text-gray-400" />
          </Button>
        </HStack>
      </HStack>

      {!foodAnalysis?.length ? (
        <NoItemAvailable />
      ) : (
        foodAnalysis.map((item, index) => (
          <Pressable key={index} onPress={openDrawer(item)}>
            <LoggedItem
              name={item.name}
              calories={item.calories}
              score={item.nutritionScore}
              protein={item.protein}
              carbs={item.carbs}
              fat={item.fat}
              timestamp={item.createdAt?.split("T")[0] ?? ""}
            />
          </Pressable>
        ))
      )}

      <FoodDetail
        showDrawer={showDrawer}
        closeDrawer={closeDrawer}
        itemInfo={selectedItem}
      />
    </VStack>
  );
};
