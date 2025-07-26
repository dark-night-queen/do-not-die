// core dependencies
import React from "react";
import { ScrollView } from "react-native";

// core components
import { VStack } from "@/components/ui";

// custom components
import DefaultLayout from "@/screens/_layout";
import { PersonalizedRecommendation } from "./_components/personalized-recommendation";
import { DailyReport } from "./_components/daily-report";
import { ScannerButton } from "./_components/scanner-button";
import { WeeklyCalendar } from "./_components/weekly-calendar";
import { MacroCard } from "./_components/macro-card";
import { MetricsCard } from "./_components/metrics-card";
import { RecentlyLoggedItem } from "./_components/recently-logged-item";

// component logic
const HomeScreen = () => {
  return (
    <DefaultLayout className="p-0">
      <ScrollView>
        <VStack className="gap-4 p-6">
          <WeeklyCalendar />
          <MacroCard />
          <MetricsCard />
          <ScannerButton />
          <RecentlyLoggedItem />
          <DailyReport />
          <PersonalizedRecommendation />
        </VStack>
      </ScrollView>
    </DefaultLayout>
  );
};

export default HomeScreen;
