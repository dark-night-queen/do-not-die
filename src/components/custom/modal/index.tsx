import {
  Modal as UIModal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader as UIModalHeader,
} from "@/components/ui/modal";
import type {
  IModalProps as IUIModalProps,
  IModalHeaderProps as IUIModalHeaderProps,
} from "@/components/ui/modal";
import { Icon, CloseIcon } from "@/components/ui/icon";
import { Heading } from "@/components/ui/heading";

type IModalProps = {} & IUIModalProps & React.PropsWithChildren;

export const ModalHeader = ({
  children,
  ...props
}: React.PropsWithChildren & IUIModalHeaderProps) => {
  return (
    <UIModalHeader {...props}>
      <Heading size="md" className="text-typography-950">
        {children}
      </Heading>
      <ModalCloseButton>
        <Icon
          as={CloseIcon}
          size="md"
          className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
        />
      </ModalCloseButton>
    </UIModalHeader>
  );
};

export const Modal = ({ children, ...props }: IModalProps) => {
  return (
    <UIModal size="md" {...props}>
      <ModalBackdrop />
      <ModalContent className="rounded-xl gap-2">{children}</ModalContent>
    </UIModal>
  );
};
