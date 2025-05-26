import { useColorScheme } from "nativewind";
import { Bell, Moon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { GhostButton } from "./ghost-button";

export const Settings = () => {
  const { toggleColorScheme, colorScheme } = useColorScheme();

  return (
    <>
      <Text className="text-sm font-medium text-gray-400">Settings</Text>

      <GhostButton
        icon={Moon}
        name={`${colorScheme} Mode`}
        onPress={toggleColorScheme}
      />
      <GhostButton icon={Bell} name="Notification" />
    </>
  );
};
