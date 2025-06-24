import React from "react";
import { SafeAreaView } from "react-native";
import { Box } from "@/components/ui";
import { CaptureUserDetails } from "./_components/capture-user-details";

export default () => {

  React.useEffect(() => {
    // setUser({
    //   name: "John Doe",
    // });
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
