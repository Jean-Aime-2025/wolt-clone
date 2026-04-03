import { Stack } from '@/components/Stack';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../../../constants/theme';

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      {/* Main tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Restaurant modal */}
      <Stack.Screen
        name="(modal)/(restaurant)/[id]"
        options={{
          presentation: 'card',
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />

      {/* Map modal */}
      <Stack.Screen
        name="(modal)/map"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />

      {/* Location sheet */}
      <Stack.Screen
        name="(modal)/location"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.7],
          title: '',
          headerShadowVisible: false,
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          headerRight: () => (
            <TouchableOpacity
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.light,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="close-sharp" size={28} />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Filter sheet */}
      <Stack.Screen
        name="(modal)/filter"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.8],
          title: '',
          headerShadowVisible: false,
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          contentStyle: {
            backgroundColor: Colors.background,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.light,
              }}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="close-sharp" size={28} />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Menu full sheet */}
      <Stack.Screen
        name="(modal)/(menu)/[id]"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [1],
          title: '',
          headerShadowVisible: false,
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
          sheetExpandsWhenScrolledToEdge: true,
          headerShown: false,
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />

      {/* Order screen */}
      <Stack.Screen
        name="order"
        options={{
          animation: 'fade',
        }}
      />
    </Stack>
  );
};

export default Layout;