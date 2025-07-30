// core dependencies
import React from "react";
import colors from "tailwindcss/colors";

// core components
import {
  Button,
  ButtonText,
  ModalBody,
  ModalFooter,
  Spinner,
  VStack,
} from "@/components/ui";

// custom components
import {
  Modal,
  ModalHeader,
  FormElement,
  InputElement,
} from "@/components/custom";

interface IAddFoodModal {
  isDisabled: boolean;
  isAnalyzing: boolean;
  formData: {
    foodName: string;
    servingSize: string;
  };
  errors: Record<string, string>;
  showModal: boolean;
  handleChange: (name: string) => (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

// component logic
export const AddFoodModal = ({
  isDisabled,
  isAnalyzing,
  formData,
  errors,
  handleChange,
  showModal,
  onClose,
  onSubmit,
}: IAddFoodModal) => {
  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <ModalHeader>Add Food Manually</ModalHeader>

      <ModalBody>
        <VStack className="gap-3">
          <FormElement label="Food Name" error={errors.foodName}>
            <InputElement
              placeholder="(e.g. Chicken Tikka Masala)"
              value={formData.foodName}
              onChangeText={handleChange("foodName")}
            />
          </FormElement>

          <FormElement
            label="Serving Size (optional)"
            error={errors.servingSize}
          >
            <InputElement
              placeholder="(e.g. 1 cup, 200g)"
              value={formData.servingSize}
              onChangeText={handleChange("servingSize")}
            />
          </FormElement>
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button
          onPress={onSubmit}
          className="w-full rounded-lg"
          isDisabled={isDisabled}
        >
          <ButtonText>Add Food</ButtonText>
          {isAnalyzing ? <Spinner size="small" color={colors.white} /> : null}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
