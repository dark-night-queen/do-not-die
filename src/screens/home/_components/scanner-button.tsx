import { Camera } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";

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
