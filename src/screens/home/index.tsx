import React from "react";
import Layout from "./_layout";
import { MacroCard } from "./_components/macro-card";
import { MetricsCard } from "./_components/metrics-card";
import { ScannerButton } from "./_components/scanner-button";
import { RecentlyLoggedItem } from "./_components/recently-logged-item";
import { DailyReport } from "./_components/daily-report";
import { PersonalizedRecommendation } from "./_components/recommendation";
import { WeeklyCalendar } from "./_components/weekly-calendar";
import { useDailyDataStore } from "@/store/useDailyDataStore";
import { useProfileStore } from "@/store/useOnboardingStore";

export default () => {
  const { init } = useDailyDataStore();
  const { profile } = useProfileStore();

  React.useEffect(() => {
    if (profile) init(profile);
  }, [profile]);

  return (
    <Layout isScrollable={true}>
      <WeeklyCalendar />
      <MacroCard />
      <MetricsCard />
      <ScannerButton />
      <RecentlyLoggedItem />
      <DailyReport />
      <PersonalizedRecommendation />
    </Layout>
  );
};
