import React from "react";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const VideoPreviewScreen = ({ route, navigation }) => {
  const { url } = route.params;

  const handleCloseWebView = () => {
    navigation.navigate("Tasks");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleCloseWebView}
          style={styles.closeButton}
        >
          <Ionicons name="ios-arrow-back-circle" size={24} color="white" />
          <Text style={styles.closeButtonText}>Back</Text>
        </TouchableOpacity>

        <WebView source={{ uri: url }} />
      </View>
    </SafeAreaView>
  );
};

export default VideoPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#262626",
  },
  closeButtonText: {
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
