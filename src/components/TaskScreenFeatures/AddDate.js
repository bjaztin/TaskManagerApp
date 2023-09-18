import { StyleSheet, View } from "react-native";
import React from "react";
import { Calendar as RNCalendar } from "react-native-calendars";

const AddDate = ({ selectedDate, onSelectedDateChange }) => {

  const dateFormatter = (date) => {

    const dateFormat = new Date(date.timestamp).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return {
      day: dateFormat,
      timestamp: date.timestamp,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <RNCalendar
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#D58258" },
          }}
          onDayPress={(day) => onSelectedDateChange(day.dateString)}
          dateFormatter={dateFormatter}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#D58258",
            dayTextColor: "#2d4150",
            textDisabledColor: "green",
          }}
        />
      </View>
    </View>
  );
};

export default AddDate;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  calendarContainer: {
    borderRadius: 10, 
    overflow: "hidden", 
  },
});
