// core dependencies
// import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
// import { RefreshCcw } from "lucide-react-native";

// core components
import {
  Button,
  // ButtonIcon,
  ButtonText,
  HStack,
  VStack,
  Text,
} from "@/components/ui";

// custom components
import { GoBack } from "../_components";
import DefaultLayout from "@/screens/_layout";
import { CameraButton } from "./_components/camera-button";

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

  // Camera permissions are still loading.
  if (!permission) {
    return <DefaultLayout />;
  }

  // Camera permissions are not granted yet.
  if (!permission.granted) {
    return (
      <DefaultLayout>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>
          <ButtonText>Grant Permission</ButtonText>
        </Button>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout className="flex-1 p-0">
      <HStack className="items-center px-6 py-4">
        <GoBack
          type="text"
          goBackRoute={"/(tabs)"}
          className="self-center top-6"
        />
      </HStack>

      {/* camera view */}
      <CameraView style={{ flex: 1 }} facing="back" />

      {/* Lower Deck */}
      <HStack className="items-center px-6 py-4">
        {/* Spacer */}
        <VStack className="flex-1 left-3 items-center">
          <CameraButton />
        </VStack>
      </HStack>
    </DefaultLayout>
  );
};

export default CameraScreen;
