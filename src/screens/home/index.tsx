import { SafeAreaView, ScrollView } from "react-native";
import { Box, VStack } from "@/components/ui";
import { MacroCard } from "./_components/macro-card";
import { MetricsCard } from "./_components/metrics-card";
import { ScannerButton } from "./_components/scanner-button";
import { RecentlyLoggedItem } from "./_components/recently-logged-item";
import { DailyReport } from "./_components/daily-report";
import { PersonalizedRecommendation } from "./_components/recommendation";
import { WeeklyCalendar } from "./_components/weekly-calendar";

export default () => {
  return (
    <SafeAreaView>
      <Box variant="scroll">
        <ScrollView>
          <VStack className="gap-8 p-4">
            <WeeklyCalendar />
            <MacroCard />
            <MetricsCard />
            <ScannerButton />
            <RecentlyLoggedItem />
            <DailyReport />
            <PersonalizedRecommendation />
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
