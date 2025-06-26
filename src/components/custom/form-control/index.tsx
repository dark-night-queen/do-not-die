import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  IFormControlProps,
} from "@/components/ui";

type IFormProps = {
  label?: string;
  error?: string;
} & IFormControlProps &
  React.PropsWithChildren;

export const FormElement = ({
  label,
  error,
  className,
  children,
}: IFormProps) => {
  return (
    <FormControl
      isInvalid={!!error}
      size="sm"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
      className={`w-full gap-1 ${className}`}
    >
      {label ? (
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
      ) : null}

      {children}

      <FormControlError>
        <FormControlErrorText>{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
