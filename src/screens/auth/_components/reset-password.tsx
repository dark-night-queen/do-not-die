import React from "react";
import colors from "tailwindcss/colors";
import { useAuthStore } from "@/store/useAuthStore";
import { validatePassword as validatePasswordUtil } from "@/utils/validate-auth";
import { Button, ButtonText, Text, Spinner } from "@/components/ui";
import { FormElement, InputElement } from "@/components/ui/form-control/form";

type IResetPasswordProps = {
  handleSubmit: (email: string) => void;
};

export const ResetPassword = ({ handleSubmit }: IResetPasswordProps) => {
  const { showLoader } = useAuthStore();
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

  const onResetPassword = () => {
    if (validatePassword()) {
      handleSubmit(password);
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
        {showLoader["forget-password"] ? (
          <Spinner size="small" color={colors.white} />
        ) : null}
      </Button>
    </>
  );
};
