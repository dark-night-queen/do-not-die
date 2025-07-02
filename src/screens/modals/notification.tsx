// core dependencies
import React from "react";

// custom components
import DefaultLayout from "@/screens/_layout";
import { ComingSoon } from "@/screens/_components/coming-soon";

const NotificationScreen = () => {
  return (
    <DefaultLayout className="justify-center items-center">
      <ComingSoon heading="Notification" />
    </DefaultLayout>
  );
};

export default NotificationScreen;
