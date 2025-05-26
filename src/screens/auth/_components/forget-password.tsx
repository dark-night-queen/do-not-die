import React from "react";
import { ChevronLeft } from "lucide-react-native";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  HStack,
  VStack,
  Text,
} from "@/components/ui";
import { FormElement, InputElement } from "@/components/ui/form-control/form";
import { ForgetPasswordSuccess } from "./forget-password-success";

enum Screen {
  FORGET_PASSWORD = "forget-password",
  SUCCESS = "forget-password-success",
}

type IForgetPasswordProps = {
  handleSubmit: () => void;
  goBackToLogin: () => void;
};

export const ForgetPassword = ({
  handleSubmit,
  goBackToLogin,
}: IForgetPasswordProps) => {
  const [errors, setErrors] = React.useState("");
  const [currentScreen, setCurrentScreen] = React.useState(
    Screen.FORGET_PASSWORD
  );

  const onSendEmail = () => {
    handleSubmit();
    setCurrentScreen(Screen.SUCCESS);
  };

  return (
    <Card variant="outline" className="w-full max-w-sm p-4">
      <VStack className="gap-4">
        <HStack className="items-center gap-2">
          <Button variant="link" onPress={goBackToLogin}>
            <ButtonIcon as={ChevronLeft} />
          </Button>
          <Text className="text-xl font-semibold">Reset Password</Text>
        </HStack>

        {currentScreen == Screen.SUCCESS ? (
          <ForgetPasswordSuccess goBackToLogin={goBackToLogin} />
        ) : (
          <>
            <Text className="text-sm text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </Text>

            <FormElement error={errors}>
              <InputElement
                placeholder="Email"
                // value={formData.age}
                // onChangeText={handleChange("age")}
              />
            </FormElement>

            <Button onPress={onSendEmail}>
              <ButtonText>Send Email</ButtonText>
            </Button>
          </>
        )}
      </VStack>
    </Card>
  );
};
