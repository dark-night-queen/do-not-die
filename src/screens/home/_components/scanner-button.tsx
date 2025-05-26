import { Camera } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

export const ScannerButton = () => {
  return (
    <Button className="rounded-lg">
      <ButtonIcon as={Camera} className="text-white" />
      <ButtonText>Tap to Scan Food</ButtonText>
    </Button>
  );
};
