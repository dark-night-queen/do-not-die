import React from "react";
import { Keyboard, Platform, ScrollView } from "react-native";
import { Box, Card, VStack } from "@/components/ui";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "@/components/ui/keyboard-avoiding-view";
import { IconContainer } from "@/components/custom";
import { Heart } from "lucide-react-native";

export default ({ children }: React.PropsWithChildren) => {
  return (
    <ScrollView>
      <Box variant="screen" className="gap-6">
        <IconContainer
          as={Heart}
          className="p-4 rounded-full self-center dark:bg-gray-800"
          iconClassName="h-12 w-12"
        />
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
