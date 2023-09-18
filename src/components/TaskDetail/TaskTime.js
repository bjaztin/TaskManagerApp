import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaskTime = ({selectedTime, selectedEndTime, isComplete}) => {

      const selectedTimeFormat =
        selectedTime instanceof Date
          ? selectedTime.toLocaleTimeString([], { timeStyle: "short" })
          : "";

      const selectedEndTimeFormat =
        selectedEndTime instanceof Date
          ? selectedEndTime.toLocaleTimeString([], { timeStyle: "short" })
          : "";

  return (
    <View style={styles.container}>
      {selectedTime && (
        <Text
          style={[
            styles.selectedTimeText,
            isComplete ? styles.completedTask : styles.selectedTimeText,
          ]}
        >
          , {selectedTimeFormat}
        </Text>
      )}
      {selectedEndTime && (
        <Text
          style={[
            styles.selectedTimeText,
            isComplete ? styles.completedTask : styles.selectedTimeText,
          ]}
        >
          - {selectedEndTimeFormat}
        </Text>
      )}
    </View>
  );
}

export default TaskTime

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  completedTask: {
    color: "gray",
  },
  selectedTimeText: {
    maxWidth: "100%",
    paddingTop: 6,
    fontSize: 10,
    paddingLeft: 2,
    color: "lightgray",
  },
});