// core dependencies
import React from "react";
import { Href } from "expo-router";
import colors from "tailwindcss/colors";

// core components
import { Button, ButtonText, Spinner, VStack } from "@/components/ui";

// custom components
import DefaultLayout from "@/screens/_layout";
import { GoBack } from "@/screens/_components";
import { ScrollView } from "react-native";

type ILayoutProps = {
  goBackRoute?: Href;
  onSubmit?: () => void;
  button: {
    text: string;
    isDisabled?: boolean;
  };
} & React.PropsWithChildren;

const Layout = ({ children, goBackRoute, onSubmit, button }: ILayoutProps) => {
  const [showLoader, setShowLoader] = React.useState(false);

  const handleSubmit = async () => {
    setShowLoader(true);
    await onSubmit?.();
    setShowLoader(false);
  };

  return (
    <DefaultLayout className="p-0">
      {goBackRoute ? (
        <VStack className="p-6">
          <GoBack goBackRoute={goBackRoute} />
        </VStack>
      ) : null}

      <ScrollView>
        <VStack className={`gap-4 p-6`}>
          {children}

          <Button
            className="w-full rounded-lg"
            onPress={handleSubmit}
            {...button}
          >
            <ButtonText>{button.text}</ButtonText>
            {showLoader ? <Spinner size="small" color={colors.white} /> : null}
          </Button>
        </VStack>
      </ScrollView>
    </DefaultLayout>
  );
};

export default Layout;
