import React from "react";
import Layout from "./_layout";
import { Text } from "@/components/ui";
import { ComingSoon } from "./_components/coming-soon";

export default () => {
  return (
    <Layout>
      <Text className="text-2xl font-medium">Notification Coming Soon</Text>
      <ComingSoon />
    </Layout>
  );
};
