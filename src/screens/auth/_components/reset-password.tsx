// core dependencies
import React from "react";
import colors from "tailwindcss/colors";

// core components
import { FormElement, InputElement } from "@/components/custom";
import { Button, ButtonText, Spinner, Text } from "@/components/ui";

// handler functions
import { validatePassword as validatePasswordUtil } from "@/utils/validate-auth";

type IResetPasswordProps = {
  handleSubmit: (email: string) => void;
};

// component logic
export const ResetPassword = ({ handleSubmit }: IResetPasswordProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name: string) => (value: string) => {
    if (name === "password") {
      setPassword(value);
      setError((prev) => ({ ...prev, password: "" }));
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setError((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validatePassword = () => {
    const error_message = validatePasswordUtil(password);
    setError((prev) => ({ ...prev, password: error_message }));

    if (!error_message && password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Password did not match!",
      }));
      return false;
    }

    return !error_message;
  };

  const onResetPassword = async () => {
    if (validatePassword()) {
      setIsLoading(true);
      await handleSubmit(password);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Text className="text-xl font-semibold">Reset Password</Text>

      <Text className="text-sm text-gray-400">
        Enter your new confirmPassword.
      </Text>

      <FormElement error={error.password}>
        <InputElement
          placeholder="New Password"
          value={password}
          onChangeText={handleChange("password")}
          type="password"
        />
      </FormElement>

      <FormElement error={error.confirmPassword}>
        <InputElement
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={handleChange("confirmPassword")}
          type="password"
        />
      </FormElement>

      <Button onPress={onResetPassword}>
        <ButtonText>Confirm Password</ButtonText>
        {isLoading ? <Spinner size="small" color={colors.white} /> : null}
      </Button>
    </>
  );
};
