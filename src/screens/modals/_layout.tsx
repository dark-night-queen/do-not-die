import React from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { Box, VStack } from "@/components/ui";
import { GoBack } from "../onboarding/_components/go-back";
import { IconContainer } from "@/components/custom";
import { Heart } from "lucide-react-native";

type ILayoutProps = {} & React.PropsWithChildren;

export default ({ children }: ILayoutProps) => {
  const navigation = useNavigation();
  const router = useRouter();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.push("/(tabs)/profile");
    }
  };

  return (
    <SafeAreaView>
      <Box variant="screen">
        <GoBack goBack={goBack} />
        <VStack className="p-2 gap-8 w-full max-w-sm">
          <IconContainer
            as={Heart}
            className="p-4 rounded-2xl self-center dark:bg-gray-800"
            iconClassName="h-12 w-12"
          />

          <VStack className="items-center gap-4">{children}</VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
