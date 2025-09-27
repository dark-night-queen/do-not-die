import { Href } from "expo-router";

export const Routes: { [key: string]: Href } = {
  /**
   * @description All the routes of the app
   * Add new routes here and use them in the app like Routes.ROUTE_NAME
   * Example: Routes.HOME
   * This helps in avoiding hardcoding of routes and makes it easier to manage routes in one place.
   */

  ROOT: "/",
  AUTH: "/auth",
  ONBOARDING: "/onboarding",
  HOME: "/(tabs)",
  SPLASH: "/(loaders)",
  // PROFILE: "/profile ",
  // SEARCH: "/app/search",
  // SCAN: "/app/scan",
  // MEAL: "/app/meal",
  // MEAL_DETAILS: "/app/meal/[id]",
  // SETTINGS: "/app/settings",
  // NOT_FOUND: "/not-found",
};
