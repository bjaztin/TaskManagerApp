import { StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ModalTagPicker from "../../utilities/ModalTagPicker";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskTagIcon = ({ item, isComplete }) => {
  const [isTagPickerVisible, setIsTagPickerVisible] = useState(false);
  const [selectTag, setSelectedTag] = useState("label-outline");
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

  const iconContainerRef = useRef(null);

  useEffect(() => {
    // Load the UI state from AsyncStorage
    const loadTagState = async () => {
      try {
        const storedTagState = await AsyncStorage.getItem(
          `selectedTag_${item.id}`
        );
        if (storedTagState !== null) {
          setSelectedTag(JSON.parse(storedTagState));
        }
      } catch (error) {
        console.error("Error loading UI state from AsyncStorage:", error);
      }
    };

    loadTagState();
  }, []);

  // Calculate modal position
  useEffect(() => {
    if (iconContainerRef.current) {
      iconContainerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setModalPosition({ top: pageY + height - 30, right: pageX - 200 });
      });
    }
  }, [isTagPickerVisible]);

  const changeTagPickerModal = () => {
    setIsTagPickerVisible(!isTagPickerVisible);
  };

  const onTagSelected = async (option) => {
    setSelectedTag(option);

    try {
      await AsyncStorage.setItem(
        `selectedTag_${item.id}`,
        JSON.stringify(option)
      );
    } catch (error) {
      console.error("Error saving completion status to AsyncStorage:", error);
    }

    setIsTagPickerVisible(false);
  };

  const TAG_ICONS = {
    "label-outline": "label-outline",
    "Red Tag": "label",
    "Green Tag": "label",
    "Orange Tag": "label",
  };

  const getColorForTag = (option) => {
    switch (option) {
      case "Red Tag":
        return "#F94C10";
      case "Green Tag":
        return "#C8E4B2";
      case "Orange Tag":
        return "#FDB750";
      default:
        return "gray";
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="taskTag"
        onPress={(event) => changeTagPickerModal(event)}
        disabled={isComplete}
        style={styles.iconContainer}
        ref={iconContainerRef} 
      >
        <MaterialIcons
          name={TAG_ICONS[selectTag]}
          color={getColorForTag(selectTag)}
          size={22}
          style={[styles.icon, isComplete ? styles.completedTask : styles.icon]}
        />
      </TouchableOpacity>

      <Modal
        testID="tagPickerModal"
        transparent={true}
        animationType="fade"
        visible={isTagPickerVisible}
        onRequestClose={() => changeTagPickerModal(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { top: modalPosition.top, right: modalPosition.right },
          ]}
        >
          <ModalTagPicker
            changeTagPickerModal={changeTagPickerModal}
            onTagSelected={onTagSelected}
            selectTag={selectTag}
          />
        </View>
      </Modal>
    </View>
  );
};

export default TaskTagIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  modalContainer: {
    position: "absolute", 
  },
  iconContainer: {
    right:40,
    top:-10
  },
  icon: {
    transform: [{ rotate: "180deg" }],
  },
  completedTask: {
    color: "gray",
  },
});


