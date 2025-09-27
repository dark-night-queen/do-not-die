// core dependencies
import React from "react";
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
import DefaultLayout from "@/screens/_layout";
import { GoBack } from "../_components";
import { CameraButton } from "./_components/camera-button";

// handler functions
import { supabase } from "@/utils/supabase";
import { useUserStore } from "@/store/useOnboardingStore";

// component logic
const CameraScreen = () => {
  const { user } = useUserStore();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);

  const uploadPhoto = async (uri: string) => {
    let name = uri.split("/").pop() || "";
    let newFormData = new FormData();
    newFormData.append("file", {
      uri,
      name,
      type: "image/jpeg",
    } as unknown as Blob);

    console.log("file", newFormData);

    const { data, error } = await supabase.storage
      .from(`images/${user?.id}`)
      .upload(name, newFormData);

    console.log("data, error", data, error);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const uri = photo.uri;
      console.log("photo", photo);
      await uploadPhoto(uri);
    }
  };

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
      <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef} />

      {/* Lower Deck */}
      <HStack className="items-center px-6 py-4">
        {/* Spacer */}
        <VStack className="flex-1 left-3 items-center">
          <CameraButton onPress={takePhoto} />
        </VStack>
      </HStack>
    </DefaultLayout>
  );
};

export default CameraScreen;
