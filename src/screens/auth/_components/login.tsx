import React from "react";
import { Button, ButtonText, Card, VStack } from "@/components/ui";
import { FormElement, InputElement } from "@/components/ui/form-control/form";
import { useRouter } from "expo-router";

export const Login = () => {
  const [errors, setErrors] = React.useState("");
  const router = useRouter();

  const onSignUpPress = () => {
    router.push("/(auth)/onboarding");
  };

  const onForgotPasswordPress = () => {
    router.push("/(auth)/forget-password");
  };

  return (
    <Card variant="outline" className="w-full max-w-sm p-4">
      <VStack className="gap-4">
        <FormElement error={errors}>
          <InputElement
            placeholder="Email"
            // value={formData.age}
            // onChangeText={handleChange("age")}
          />
        </FormElement>

        <FormElement error={errors}>
          <InputElement
            placeholder="Password"
            // value={formData.age}
            // onChangeText={handleChange("age")}
          />
        </FormElement>

        <Button>
          <ButtonText>Login</ButtonText>
        </Button>
        <Button variant="outline" onPress={onSignUpPress}>
          <ButtonText>Sign Up</ButtonText>
        </Button>
        <Button variant="link" onPress={onForgotPasswordPress}>
          <ButtonText>Forgot Password</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};
