import { SafeAreaView } from "react-native";
import { Box } from "@/components/ui";
import { ComingSoon } from "./_components/coming-soon";

export default () => {
  return (
    <SafeAreaView>
      <Box variant="screen">
        <ComingSoon />
      </Box>
    </SafeAreaView>
  );
};
