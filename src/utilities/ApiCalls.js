import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const ApiCalls = React.memo(function ApiCalls({
  snippet,
  onAddToTask,
  onVideoSelect,
}) {
  const { title, thumbnails, resourceId } = snippet || {};

  const thumbnailUrl =
    thumbnails && thumbnails.maxres ? thumbnails.maxres.url : "";

  const defaultImg =
    "https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg";
    return (
      <TouchableOpacity
        useForeground
        onPress={() =>
          onVideoSelect(`https://www.youtube.com/watch?v=${resourceId.videoId}`)
        }
      >
        <Image
          source={{ uri: thumbnailUrl || defaultImg }}
          style={styles.videoThumbnail}
        />
        <View style={styles.subContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              testID="addTask"
              style={styles.button}
              onPress={() => {
                console.log("onAddToTask onpress is triggered");
                onAddToTask(title, resourceId);
              }}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="add" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
    );
});

export default ApiCalls;

const styles = {
  subContainer: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 20,
  },
  videoThumbnail: {
    flex: 1,
    height: 200,
    margin: 10,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  title: {
    marginTop: 4,
    marginLeft: 22,
    marginBottom: 20,
    fontSize: 14,
    width: "70%",
    paddingRight: 10,
    color: "black",
  },
  buttonContainer: {
    left: 20,
    bottom:8
  },
  iconContainer: {
    bottom: 2,
    alignItems: "center",
  },
  button: {
    padding: 6,
    marginTop: 6,
    backgroundColor: "#D58258",
    borderRadius: 100,
    width: 46,
    height: 46,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  divider: {
    backgroundColor: "#fbf1f1",
    bottom: 16,
  },
};
