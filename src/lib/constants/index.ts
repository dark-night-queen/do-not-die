const defaultBaseUrl = process.env.EXPO_PUBLIC_BASE_URL;
const baseUrl =
  typeof window !== "undefined" ? window.location.origin : defaultBaseUrl;

export { baseUrl };
