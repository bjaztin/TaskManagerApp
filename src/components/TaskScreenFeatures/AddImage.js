import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const AddImage = ({ selectedImage, onSelectedImage }) => {

  const [image, setImage] = useState(selectedImage);

  const thisIsImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset.uri);
      onSelectedImage(selectedAsset.uri);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={thisIsImage} style={styles.iconImage}>
        <Ionicons name="image" size={24} color="gray" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            testID="image"
          />
        )}
      </View>
    </View>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  iconImage: {
    marginLeft: 8,
  },
  imageContainer: {
    marginTop: 5,
    marginLeft: 8,
  },
  image: {
    borderRadius: 10,
    width: 50,
    height: 50,
  },
});
