import React from "react";
import { SafeAreaView } from "react-native";
import { Box } from "@/components/ui";
import { useAuth } from "@/providers/auth-provider";
import { CaptureUserDetails } from "./_components/capture-user-details";

export default () => {
  const { user, setUser } = useAuth();

  React.useEffect(() => {
    setUser({
      name: "John Doe",
    });
  }, []);

  return (
    <SafeAreaView>
      <Box variant="screen">
        {/* <Text>Hello, {user?.name}</Text> */}
        <CaptureUserDetails />
      </Box>
    </SafeAreaView>
  );
};
