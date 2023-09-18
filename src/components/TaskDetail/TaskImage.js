import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const TaskImage = ({ selectedImage, isComplete, onImagePress }) => {
  const handleImagePress = () => {
    if (selectedImage) {
      onImagePress(selectedImage);
    }
  };

  return (
    <View>
      {selectedImage && typeof selectedImage === "string" && (
        <TouchableOpacity onPress={handleImagePress} disabled={isComplete}>
          <Image
            testID="taskImage"
            source={{ uri: selectedImage }}
            style={[
              styles.image,
              isComplete ? styles.completedTaskImage : styles.image,
            ]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TaskImage;

const styles = StyleSheet.create({
  completedTask: {
    color: "gray",
  },
  completedTaskImage: {
    opacity: 0.3,
  },
  image: {
    width: 50,
    height: 50,
    top: 10,
    paddingLeft: 2,
    borderRadius: 10,
  },
});
