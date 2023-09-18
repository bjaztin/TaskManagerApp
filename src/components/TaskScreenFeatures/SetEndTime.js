import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "@react-native-community/datetimepicker";

const SetEndTime = ({ onSelectedEndTimeChange }) => {

  const [isTimePicker, setTimePicker] = useState(false);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const showTimePicker = () => {
    setTimePicker(true);
  };

  const handleConfirm = (time) => {
    if (time) {
      console.log("Setting selected end time:", time);
      onSelectedEndTimeChange(time);
      setSelectedEndTime(time); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.title}>End Time</Text>
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
          testID="timePicker"
          value={selectedEndTime || new Date()}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={(event, time) => handleConfirm(time)}
        />
      )}
    </View>
  );
};

export default SetEndTime;

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
    paddingTop: 20,
  },
  title: {
    paddingTop: 4,
    fontSize: 16,
  },
});
