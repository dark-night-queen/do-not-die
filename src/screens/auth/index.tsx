import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Box } from "@/components/ui";
import { useAuth } from "@/providers/auth-provider";
import { Login } from "./_components/login";

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
        <Login />
      </Box>
    </SafeAreaView>
  );
};
