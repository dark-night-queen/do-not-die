import React from "react";
import colors from "tailwindcss/colors";
import {
  validateEmail as validateEmailUtil,
  validatePassword as validatePasswordUtil,
} from "@/utils/validate-auth";
import { Button, ButtonText, Spinner } from "@/components/ui";
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
  const [showLoader, setShowLoader] = React.useState({
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
      setShowLoader((prev) => ({ ...prev, login: true }));
      await handleLogin(email, password);
      setShowLoader((prev) => ({ ...prev, login: false }));
    }
  };

  const onSignUpPress = async () => {
    if (validateEmail() && validatePassword()) {
      setShowLoader((prev) => ({ ...prev, signup: true }));
      await handleSignup(email, password);
      setShowLoader((prev) => ({ ...prev, signup: false }));
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
    </>
  );
};
