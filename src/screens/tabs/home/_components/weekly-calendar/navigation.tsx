// core dependencies
import { ChevronLeft, ChevronRight } from "lucide-react-native";

// core components
import { HStack, Text, Button, ButtonIcon } from "@/components/ui";

// handler functions
import { useCalendar } from "@/hooks/useCalendar";

// custom components
export const Navigation = () => {
  const { navigateWeek, getCurrentMonthName, isNextDisabled } = useCalendar();

  return (
    <HStack className="items-center justify-between">
      {/* Left Nav Button */}
      <Button
        variant="link"
        className="p-2"
        onPress={() => navigateWeek("prev")}
      >
        <ButtonIcon as={ChevronLeft} />
      </Button>

      {/* Title */}
      <Text className="font-semibold">{getCurrentMonthName()}</Text>

      {/* Right Nav Button */}
      <Button
        variant="link"
        className="p-2"
        onPress={() => navigateWeek("next")}
        disabled={isNextDisabled}
      >
        <ButtonIcon
          as={ChevronRight}
          className={isNextDisabled ? "opacity-40" : ""}
        />
      </Button>
    </HStack>
  );
};
