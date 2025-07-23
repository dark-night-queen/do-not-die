// core dependencies
import React from "react";
import { Keyboard, Platform } from "react-native";
import { Heart } from "lucide-react-native";
import DefaultLayout from "@/screens/_layout";

// core components
import { IconContainer } from "@/components/custom";
import { Card, VStack } from "@/components/ui";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "@/components/ui/keyboard-avoiding-view";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <DefaultLayout className="items-center justify-center">
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
          <Card variant="outline" className="w-full p-4 rounded-xl">
            <VStack className="gap-4">{children}</VStack>
          </Card>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

export default AuthLayout;
