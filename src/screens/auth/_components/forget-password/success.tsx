// core dependencies
import React from "react";

// core components
import { Button, ButtonText, Text } from "@/components/ui";

type IForgetPasswordSuccessProps = {
  goBackToLogin: () => void;
};

// component logic
export const ForgetPasswordSuccess = ({
  goBackToLogin,
}: IForgetPasswordSuccessProps) => {
  return (
    <>
      <Text className="text-center font-medium text-green-600 dark:text-emerald-300">
        Password reset email sent! Check your inbox for further instructions.
      </Text>

      <Button onPress={goBackToLogin}>
        <ButtonText>Back To Login</ButtonText>
      </Button>
    </>
  );
};
