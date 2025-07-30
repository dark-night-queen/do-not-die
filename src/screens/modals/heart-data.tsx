// core dependencies
import React from "react";

// custom components
import DefaultLayout from "@/screens/_layout";
import { ComingSoon, GoBack } from "@/screens/_components";

const HeartDataScreen = () => {
  return (
    <DefaultLayout className="justify-center items-center">
      <GoBack goBackRoute="/profile" />
      <ComingSoon heading="Health Data" />
    </DefaultLayout>
  );
};

export default HeartDataScreen;
