import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0F52BA"
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "700"
          }
        }}
      />
      <StatusBar style="light" />
    </>
  );
}
