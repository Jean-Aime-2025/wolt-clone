import React from 'react';
import { Stack } from 'expo-router';

const StoresLayout = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StoresLayout;
