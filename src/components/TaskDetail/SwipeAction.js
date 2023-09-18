import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState, useEffect } from "react";

const SwipeAction = ({ onDelete, children }) => {
  const [isSwipeableOpen, setIsSwipeableOpen] = useState(false);

  const swipeableRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isSwipeableOpen) {
      timer = setTimeout(() => {
        swipeableRef.current?.close();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isSwipeableOpen]);

  const rightSwipe = (item) => {
    return (
      <TouchableOpacity
        testID="onSwipe"
        style={styles.deleteContainer}
        onPress={() => {
          onDelete(item);
          setIsSwipeableOpen(false);
        }}
      >
        <View testID="deleteButton">
          <Ionicons name="trash-sharp" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={rightSwipe}
      ref={swipeableRef}
      onSwipeableOpen={() => setIsSwipeableOpen(true)}
      onSwipeableClose={() => setIsSwipeableOpen(false)}
    >
      {children}
    </Swipeable>
  );
};

export default SwipeAction;

const styles = StyleSheet.create({
  deleteContainer: {
    backgroundColor: "red",
    width: "18%",
    borderRadius:30,
    alignItems: "center",
    justifyContent: "center",
  },
});
