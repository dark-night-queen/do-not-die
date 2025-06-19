import React from "react";
import { Keyboard, Platform, ScrollView } from "react-native";
import { Box, Card, VStack } from "@/components/ui";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "@/components/ui/keyboard-avoiding-view";

export default ({ children }: React.PropsWithChildren) => {
  return (
    <ScrollView>
      <Box variant="screen">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%", alignItems: "center" }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Card variant="outline" className="w-full max-w-sm p-4">
              <VStack className="gap-4">{children}</VStack>
            </Card>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Box>
    </ScrollView>
  );
};
