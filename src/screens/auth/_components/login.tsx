// core dependencies
import React from "react";
import colors from "tailwindcss/colors";

// core components
import { FormElement, InputElement } from "@/components/custom";
import { Button, ButtonText, Spinner } from "@/components/ui";

// handler functions
import {
  validateEmail as validateEmailUtil,
  validatePassword as validatePasswordUtil,
} from "@/lib/utils/validate-auth";

type ILoginProps = {
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignup: (email: string, password: string) => Promise<void>;
  handleForgetPassword: () => void;
};

// component logic
export const Login = ({
  handleLogin,
  handleSignup,
  handleForgetPassword,
}: ILoginProps) => {
  const [isLoading, setIsLoading] = React.useState({
    login: false,
    signup: false,
  });
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
    const error_message = validatePasswordUtil(password);
    setError((prev) => ({ ...prev, password: error_message }));
    return !error_message;
  };

  const onLoginPress = async () => {
    if (validateEmail() && validatePassword()) {
      setIsLoading((prev) => ({ ...prev, login: true }));
      await handleLogin(email, password);
      setIsLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const onSignUpPress = async () => {
    if (validateEmail() && validatePassword()) {
      setIsLoading((prev) => ({ ...prev, signup: true }));
      await handleSignup(email, password);
      setIsLoading((prev) => ({ ...prev, signup: false }));
    }
  };

  const onForgotPasswordPress = () => {
    handleForgetPassword();
  };

  return (
    <>
      <FormElement error={error.email}>
        <InputElement
          placeholder="Email"
          value={email}
          onChangeText={handleChange("email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </FormElement>

      <FormElement error={error.password}>
        <InputElement
          placeholder="Password"
          value={password}
          onChangeText={handleChange("password")}
          secureTextEntry
        />
      </FormElement>

      <Button
        className="rounded-lg"
        onPress={onLoginPress}
        disabled={isLoading.login || isLoading.signup}
      >
        <ButtonText>Login</ButtonText>
        {isLoading.login ? <Spinner size="small" color={colors.white} /> : null}
      </Button>

      <Button
        variant="outline"
        className="rounded-lg"
        onPress={onSignUpPress}
        disabled={isLoading.login || isLoading.signup}
      >
        <ButtonText>Sign Up</ButtonText>
        {isLoading.signup ? <Spinner size="small" color={colors.white} /> : null}
      </Button>

      <Button variant="link" onPress={onForgotPasswordPress}>
        <ButtonText>Forgot Password?</ButtonText>
      </Button>
    </>
  );
};
