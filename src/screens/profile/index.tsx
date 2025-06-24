import { SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { Box, Button, ButtonIcon, ButtonText, VStack } from "@/components/ui";
import { User } from "./_components/user";
import { Stats } from "./_components/stats";
import { Menu } from "./_components/menu";
import { useAuthStore } from "@/store/useAuthStore";

export default () => {
  const name = "Jane Doe";
  const email = "john.doe@ipsum.com";

  const currentWeight = 61.8;
  const targetWeight = 55;
  const dailyCalorieTarget = 1458;

  const router = useRouter();
  const { logout } = useAuthStore();

  const onLogout = async () => {
    await logout();
    router.push("/(auth)");
  };

  return (
    <SafeAreaView>
      <Box variant="scroll">
        <ScrollView>
          <VStack className="gap-8 p-4 pt-8">
            <User name={name} email={email} />
            <Stats
              currentWeight={currentWeight}
              targetWeight={targetWeight}
              dailyCalorieTarget={dailyCalorieTarget}
            />
            <Menu />

            <VStack className="gap-4">
              <Button variant="outline" action="warning">
                <ButtonText>Reset Onboarding</ButtonText>
              </Button>

              <Button variant="link" onPress={onLogout}>
                <ButtonIcon as={LogOut} />
                <ButtonText>Sign Out</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
