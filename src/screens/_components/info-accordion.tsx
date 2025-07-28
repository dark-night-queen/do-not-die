// core dependencies
import React from "react";

// core components
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContentText,
  AccordionContent,
} from "@/components/ui/accordion";

interface IInfoAccordion {
  item: {
    value: any;
    trigger: React.ReactNode;
    content: React.ReactNode;
  }[];
}

// component logic
export const InfoAccordion = ({ item }: IInfoAccordion) => {
  return (
    <Accordion
      size="sm"
      variant="unfilled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      className="gap-4"
    >
      {item.map(({ value, trigger, content }, index) => (
        <AccordionItem value={value} key={index}>
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>
            <AccordionContentText>{content}</AccordionContentText>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
