// core dependencies
import { useRouter } from "expo-router";
import { Camera } from "lucide-react-native";

// core components
import { Button, ButtonIcon, ButtonText } from "@/components/ui";

// component logic
export const ScannerButton = () => {
  const router = useRouter();
  const openCamera = () => {
    router.push("/camera");
  };

  return (
    <Button className="rounded-lg" onPress={openCamera}>
      <ButtonIcon as={Camera} className="text-white" />
      <ButtonText>Tap to Scan Food</ButtonText>
    </Button>
  );
};
