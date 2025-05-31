import React from "react";
import colors from "tailwindcss/colors";
import { useAuthStore } from "@/store/useAuthStore";
import { validateEmail as validateEmailUtil, validatePassword as validatePasswordUtil } from "@/utils/validate-auth";
import { Button, ButtonText, Card, VStack, Spinner } from "@/components/ui";
import { FormElement, InputElement } from "@/components/ui/form-control/form";

type ILoginProps = {
  handleLogin: (email: string, password: string) => void;
  handleSignup: (email: string, password: string) => void;
  handleForgetPassword: () => void;
};

export const Login = ({
  handleLogin,
  handleSignup,
  handleForgetPassword,
}: ILoginProps) => {
  const { showLoader } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string) => (value: string) => {
    if (name === "email") {
      setEmail(value);
      setError((prev) => ({ ...prev, email: "" }));
    } else {
      setPassword(value);
      setError((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateEmail = () => {
    const error_message = validateEmailUtil(email);
    setError((prev) => ({ ...prev, email: error_message }));
    return !error_message;
  };

  const validatePassword = () => {
    const error_message = validatePasswordUtil(password)
    setError((prev) => ({ ...prev, password: error_message }));
    return !error_message;
  };

  const onLoginPress = () => {
    if (validateEmail() && validatePassword()) {
      handleLogin(email, password);
    }
  };

  const onSignUpPress = () => {
    if (validateEmail() && validatePassword()) {
      handleSignup(email, password);
    }
  };

  const onForgotPasswordPress = () => {
    handleForgetPassword();
  };

  return (
    <Card variant="outline" className="w-full max-w-sm p-4">
      <VStack className="gap-4">
        <FormElement error={error.email}>
          <InputElement
            placeholder="Email"
            value={email}
            onChangeText={handleChange("email")}
            keyboardType="email-address"
          />
        </FormElement>

        <FormElement error={error.password}>
          <InputElement
            placeholder="Password"
            value={password}
            onChangeText={handleChange("password")}
            type="password"
          />
        </FormElement>

        <Button onPress={onLoginPress}>
          <ButtonText>Login</ButtonText>
          {showLoader.login ? (
            <Spinner size="small" color={colors.white} />
          ) : null}
        </Button>

        <Button variant="outline" onPress={onSignUpPress}>
          <ButtonText>Sign Up</ButtonText>
          {showLoader.signup ? (
            <Spinner size="small" color={colors.white} />
          ) : null}
        </Button>

        <Button variant="link" onPress={onForgotPasswordPress}>
          <ButtonText>Forgot Password</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};
