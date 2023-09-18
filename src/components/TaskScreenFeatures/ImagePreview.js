import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

const ImagePreview = ({ visible, imageUrl, onClose }) => {

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          testID="buttonClose"
        >
          <Ionicons name="close-circle" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.modalContent}>
          <ImageBackground
            testID="imagePreview"
            source={{ uri: imageUrl }}
            style={styles.expandedImage}
            resizeMode="contain"
          ></ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  expandedImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 80,
    right: 20,
    zIndex: 1,
  },
  modalContent: {
    padding: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
