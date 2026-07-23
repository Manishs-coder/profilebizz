import { Redirect } from 'expo-router';

// Tabs not used in this admin tool — redirect to founders
export default function TabIndex() {
  return <Redirect href="/founders" />;
}
