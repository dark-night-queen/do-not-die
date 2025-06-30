import React from "react";
import colors from "tailwindcss/colors";
import { ChevronLeft } from "lucide-react-native";
import { validateEmail as validateEmailUtil } from "@/utils/validate-auth";
import {
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Spinner,
  Text,
} from "@/components/ui";
import { FormElement, InputElement } from "@/components/custom";
import { ForgetPasswordSuccess } from "./forget-password-success";

enum Screen {
  FORGET_PASSWORD = "forget-password",
  SUCCESS = "forget-password-success",
}

type IForgetPasswordProps = {
  handleSubmit: (email: string) => void;
  goBackToLogin: () => void;
};

export const ForgetPassword = ({
  handleSubmit,
  goBackToLogin,
}: IForgetPasswordProps) => {
  const [showLoader, setShowLoader] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [currentScreen, setCurrentScreen] = React.useState(
    Screen.FORGET_PASSWORD,
  );

  const handleChange = (value: string) => {
    setEmail(value);
    setError("");
  };

  const validateEmail = () => {
    const error_message = validateEmailUtil(email);
    setError(error_message);
    return !error_message;
  };

  const onSendEmail = async () => {
    if (validateEmail()) {
      setShowLoader(true);
      await handleSubmit(email);
      setShowLoader(false);
      setCurrentScreen(Screen.SUCCESS);
    }
  };

  return (
    <>
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

          <FormElement error={error}>
            <InputElement
              placeholder="Email"
              value={email}
              onChangeText={handleChange}
              keyboardType="email-address"
            />
          </FormElement>

          <Button onPress={onSendEmail}>
            <ButtonText>Send Email</ButtonText>
            {showLoader ? <Spinner size="small" color={colors.white} /> : null}
          </Button>
        </>
      )}
    </>
  );
};
