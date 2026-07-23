import { Stack } from 'expo-router';

// No tab bar — admin tool uses pure stack navigation
export default function TabLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
