import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ApiCalls from "../utilities/ApiCalls";
import * as Content from "../utilities/Content";
import PropTypes from "prop-types";

const MeditationScreen = ({ navigation, bottomSheetModalRef }) => {
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const openBottomSheetModal = () => {
    bottomSheetModalRef.current.present();
  };

  const handleAddToTask = (title, resourceId) => {
    navigation.navigate("Tasks", { title, resourceId, openBottomSheetModal });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    Content.getContent()
      .then((newVideos) => {
        setVideos(newVideos);
        setRefreshing(false);
      })
      .catch(() => setRefreshing(false));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchVideos();
  };

  const handleVideoSelect = (videoUrl) => {
    console.log("Video selected:", videoUrl);
    navigation.navigate("VideoPreviewScreen", { url: videoUrl });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videos}
        testID="api-content"
        renderItem={({ item }) => (
          <ApiCalls
            key={item.id}
            snippet={item.snippet}
            onAddToTask={() =>
              handleAddToTask(item.snippet.title, item.snippet.resourceId)
            }
            onVideoSelect={(videoUrl) => handleVideoSelect(videoUrl)}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

MeditationScreen.propTypes = {
  navigation: PropTypes.object,
  bottomSheetModalRef: PropTypes.object,
};

export default MeditationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:'24%',
  },
});
