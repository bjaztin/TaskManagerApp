import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaskNote = ({isComplete, note}) => {
  return (
    <View>
      {note && (
        <Text
          style={[
            styles.itemTextNote,
            isComplete ? styles.completedTask : null,
          ]}
        >
          {note}
        </Text>
      )}
    </View>
  );
}

export default TaskNote

const styles = StyleSheet.create({
  itemTextNote: {
    maxWidth: "100%",
    paddingTop: 8,
    fontSize: 10,
    paddingLeft: 2,
    color: "lightgray",
  },
  completedTask: {
    color: "gray",
  },
});