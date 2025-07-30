import { Input, InputField, IInputFieldProps } from "@/components/ui/input";

export const InputElement = ({ children, ...props }: IInputFieldProps) => {
  return (
    <Input className="rounded-lg">
      <InputField className="text-sm" {...props} />
      {children}
    </Input>
  );
};
