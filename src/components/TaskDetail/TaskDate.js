import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaskDate = ({selectedDate, isComplete}) => {

  const parsedSelectedDate = new Date(selectedDate);

  return (
    <View>
      {selectedDate && (
        <Text
          style={[
            styles.selectedDateText,
            isComplete ? styles.completedTask : styles.selectedDateText,
          ]}
        >
          {parsedSelectedDate.toLocaleDateString()}
        </Text>
      )}
    </View>
  );
};

export default TaskDate;

const styles = StyleSheet.create({
  completedTask: {
    color: "gray",
  },
  selectedDateText: {
    maxWidth: "100%",
    paddingTop: 6,
    fontSize: 10,
    paddingLeft: 2,
    color: "lightgray",
  },
});