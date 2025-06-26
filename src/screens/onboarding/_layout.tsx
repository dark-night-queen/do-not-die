import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import colors from "tailwindcss/colors";
import { Box, VStack, Button, ButtonText, Spinner } from "@/components/ui";
import { GoBack } from "./_components/go-back";

type ILayoutProps = {
  goBack?: () => void;
  onSubmit?: () => void;
} & React.PropsWithChildren;

// TODO: Make the button text dynamic
export default ({ children, goBack, onSubmit }: ILayoutProps) => {
  const [showLoader, setShowLoader] = React.useState(false);

  const handleSubmit = async () => {
    setShowLoader(true);
    await onSubmit?.();
    setShowLoader(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <Box variant="scroll" className="flex-1">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 32,
          }}
        >
          {goBack ? <GoBack goBack={goBack} /> : null}
          <VStack className="w-full max-w-sm p-2 gap-6">
            {children}
            <Button
              className="w-full rounded-lg"
              size="sm"
              onPress={handleSubmit}
            >
              <ButtonText>Continue</ButtonText>
              {showLoader ? (
                <Spinner size="small" color={colors.white} />
              ) : null}
            </Button>
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
