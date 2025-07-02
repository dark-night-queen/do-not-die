// core dependencies
import { useColorScheme } from "nativewind";
import { Bell, Moon } from "lucide-react-native";
import { useRouter } from "expo-router";

// core components
import { Text } from "@/components/ui";

// custom components
import { GhostButton } from "@/screens/_components/ghost-button";

// component logic
export const Settings = () => {
  const router = useRouter();
  const { toggleColorScheme, colorScheme } = useColorScheme();

  const onNotificationPress = () => router.replace("/modal/notification");

  return (
    <>
      <Text className="text-sm font-medium text-gray-400">Settings</Text>

      <GhostButton
        icon={Moon}
        name={`${colorScheme} Mode`}
        onPress={toggleColorScheme}
      />

      <GhostButton
        icon={Bell}
        name="Notification"
        onPress={onNotificationPress}
      />
    </>
  );
};
