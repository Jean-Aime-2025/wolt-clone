import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Text,
} from 'react-native';
import { useState } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

interface RestaurantHeaderProps {
  scrollOffset: SharedValue<number>;
}

const SCROLL_THRESHOLD_START = 50;
const SCROLL_THRESHOLD_END = 80;

const RestaurantDetailsHeader = ({ scrollOffset }: RestaurantHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  // Header animation
  const headerStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP
    );

    const shadowOpacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END],
      [0, 0.1],
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: `rgba(255,255,255, ${backgroundOpacity})`,
      shadowOpacity,
    };
  });

  // Search bar animation
  const searchBarStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_START],
      [0.9, 1],
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: `rgba(230,230,230, ${backgroundOpacity})`,
    };
  });

  // Heart button fade out
  const buttonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_END],
      [1, 0],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  // Menu button fade in
  const buttonStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START * 0.3, SCROLL_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  return (
    <Animated.View
      style={[styles.headerContainer, headerStyle, { paddingTop: insets.top }]}
    >
      <View style={styles.headerContent}>
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={25} />
        </TouchableOpacity>

        {/* Search bar */}
        <Animated.View style={[styles.searchBar, searchBarStyle]}>
          <Ionicons name="search" size={20} color={Colors.muted} />
          <TextInput
            style={{ fontSize: 15 }}
            placeholder="Search"
            placeholderTextColor={Colors.muted}
          />
        </Animated.View>

        {/* Spacer */}
        <View style={{ width: 40, height: 40 }} />

        {/* Heart button */}
        <Animated.View style={[styles.iconButton, buttonStyle]}>
          <Ionicons name="heart-outline" size={24} />
        </Animated.View>

        {/* Menu button */}
        <Animated.View style={[styles.iconButton, buttonStyle2]}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="ellipsis-horizontal" size={24} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* ✅ Modal Menu (cross-platform) */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => console.log('More info')}>
              <Text style={styles.menuItem}>More info</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Favorite')}>
              <Text style={styles.menuItem}>Add to favorites</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Share')}>
              <Text style={styles.menuItem}>Share venue</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 50,
    gap: 8,
  },
  iconButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modal styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: 200,
  },
  menuItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default RestaurantDetailsHeader;