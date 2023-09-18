import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

const TaskUrl = ({ url, isComplete }) => {

  const navigation = useNavigation();

  const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      navigation.navigate("VideoPreviewScreen", { url });
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress} disabled={isComplete}>
        <Text
          style={[styles.itemTextUrl, isComplete ? styles.completedTask : null]}
        >
          {url}
        </Text>
      </TouchableOpacity>
    );
  };

  return <View>{url && <OpenURLButton url={url}></OpenURLButton>}</View>;
};

export default TaskUrl;

const styles = StyleSheet.create({
  itemTextUrl: {
    maxWidth: "100%",
    paddingTop: 6,
    fontSize: 10,
    paddingLeft: 2,
    color: "#CEDEBD",
    textDecorationStyle: "solid",
  },
  completedTask: {
    color: "gray",
  },
});
