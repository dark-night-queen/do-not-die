// core dependencies
import React from "react";
import { Keyboard, Platform } from "react-native";
import { Heart } from "lucide-react-native";

// core components
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "@/components/ui/keyboard-avoiding-view";
import { IconContainer } from "@/components/custom";
import { Card, VStack } from "@/components/ui";
import DefaultLayout from "@/src/screens/_layout";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <DefaultLayout className="items-center justify-center p-4">
      <IconContainer
        as={Heart}
        className="self-center rounded-full p-4 dark:bg-gray-800"
        iconClassName="h-12 w-12"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ width: "100%", alignItems: "center" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card variant="outline" className="w-full rounded-xl p-4">
            <VStack className="gap-4">{children}</VStack>
          </Card>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

export default AuthLayout;
