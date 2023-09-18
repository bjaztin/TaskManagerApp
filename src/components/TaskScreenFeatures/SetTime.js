import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "@react-native-community/datetimepicker";

const SetTime = ({ selectedTime, onSelectedTimeChange }) => {
  const [isTimePicker, setTimePicker] = useState(false);

  const showTimePicker = () => {
    setTimePicker(true);
  };

  const handleConfirm = (time) => {
    if (time) {
      onSelectedTimeChange(time);
      selectedTime;
    } 
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.title}>Start Time</Text>
        <Switch
          testID="timeSwitch"
          value={isTimePicker}
          onValueChange={(value) => {
            setTimePicker(value);
            if (value) {
              showTimePicker();
            } else {
              handleConfirm(null);
            }
          }}
          style={styles.switch}
        />
      </View>

      {isTimePicker && (
        <DateTimePickerModal
          value={selectedTime}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={(event, time) => handleConfirm(time)}
          testID="timePicker"
        />
      )}
    </View>
  );
};

export default SetTime;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 12,
  },
  timeContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 18,
    justifyContent: "space-between",
  },
  switch: {
    paddingTop: 18,
  },
  title: {
    paddingTop: 4,
    fontSize: 16,
  },
});
