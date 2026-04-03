import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      />
      <Stack.Screen
        name="other-options"
        options={{
          headerShown: false,
          presentation:'formSheet',
          title:'',
          sheetAllowedDetents:[0.6],
          headerShadowVisible:false,
        }}
      />
    </Stack>
  );
}
