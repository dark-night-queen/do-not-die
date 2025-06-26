import React from "react";
import colors from "tailwindcss/colors";
import { Button, ButtonText, Spinner, Text } from "@/components/ui";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import {
  useProfileStore,
  useGoalStore,
  useActivityStore,
} from "@/store/useOnboardingStore";

interface IResetOnboardingAlert {
  showAlert: boolean;
  onClose: () => void;
}

export const ResetOnboardingAlert = ({
  showAlert,
  onClose,
}: IResetOnboardingAlert) => {
  const { updateOnboardingStatus } = useProfileStore();
  const { resetGoal } = useGoalStore();
  const { resetActivity } = useActivityStore();
  const [showLoader, setShowLoader] = React.useState(false);

  const onResetOnboarding = async () => {
    setShowLoader(true);
    await resetGoal();
    await resetActivity();
    await updateOnboardingStatus(false);
    setShowLoader(false);
    onClose();
  };

  return (
    <AlertDialog isOpen={showAlert} onClose={onClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            Are you sure you want to reset the onboarding?
          </Heading>
        </AlertDialogHeader>

        <AlertDialogBody className="mt-3 mb-4">
          <Text size="sm">
            Resetting the onboarding will affect your existing progress
            permanently and cannot be undone. Please confirm if you want to
            proceed.
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={onClose}
            size="sm"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="sm" onPress={onResetOnboarding}>
            <ButtonText>Confirm</ButtonText>
            {showLoader ? <Spinner size="small" color={colors.white} /> : null}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
