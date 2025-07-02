// core dependencies
import React from "react";

// custom components
import DefaultLayout from "@/screens/_layout";
import { ComingSoon } from "@/screens/_components/coming-soon";

const EditProfileScreen = () => {
  return (
    <DefaultLayout className="justify-center items-center">
      <ComingSoon heading="Edit Profile" />
    </DefaultLayout>
  );
};

export default EditProfileScreen;
