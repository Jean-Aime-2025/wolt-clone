import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { Colors } from '../../../../../constants/theme';

const Page = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);

  const today = new Date();

  const getNextDate = (days: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return `${d.getDate()}.${d.getMonth() + 1}`;
  };

  const nextDays = ['Today', getNextDate(1), getNextDate(2), getNextDate(3)];

  const nextTimes = Array.from({ length: 24 * 12 }, (_, i) => {
    const hour = Math.floor(i / 12);
    const minute = (i % 12) * 5;
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  });

  const handleConfirm = () => {
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Days */}
      <Text style={styles.label}>Select Day</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {nextDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedDay === index && styles.selectedOption,
            ]}
            onPress={() => setSelectedDay(index)}
          >
            <Text
              style={[
                styles.optionText,
                selectedDay === index && styles.selectedText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Times */}
      <Text style={styles.label}>Select Time</Text>
      <ScrollView style={{ maxHeight: 200 }}>
        {nextTimes.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedTime === index && styles.selectedOption,
            ]}
            onPress={() => setSelectedTime(index)}
          >
            <Text
              style={[
                styles.optionText,
                selectedTime === index && styles.selectedText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  option: {
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: Colors.secondary,
  },
  optionText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
  button: {
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});