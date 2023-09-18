import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ModalTagPicker = (props) => {
  
  const OPTIONS = [
    {
      label: "Red Tag",
      icon: <MaterialIcons name="label" size={22} color="#F94C10" />,
    },
    {
      label: "Orange Tag",
      icon: <MaterialIcons name="label" size={22} color="#FDB750" />,
    },
    {
      label: "Green Tag",
      icon: <MaterialIcons name="label" size={22} color="#C8E4B2" />,
    },
    {
      label: "label-outline",
      icon: <MaterialIcons name="label-outline" size={22} color="gray" />,
    },
  ];

  const onPressItem = (option) => {
    props.onTagSelected(option.label);
    props.changeTagPickerModal(false);
  };

  const options = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        testID={`labelTag_${index}`}
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <View style={styles.items}>{item.icon}</View>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity
      onPress={() => props.changeTagPickerModal(false)}
      style={styles.container}
      testID="modal"
    >
      <View style={[styles.modal]}>{options}</View>
    </TouchableOpacity>
  );
};

export default ModalTagPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
  },
  option: {
    padding: 10,
  },
  items: {
    transform: [{ rotate: "180deg" }],
  },
});
