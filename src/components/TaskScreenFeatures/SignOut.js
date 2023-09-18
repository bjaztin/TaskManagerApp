import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const SignOut = () => {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setModalVisible(false);
        navigation.replace("OnBoarding");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          testID="signOutmodal"
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to sign out?
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.cancelButton]}
                  onPress={() => setModalVisible(!modalVisible)}
                  testID="cancel"
                >
                  <Text style={styles.cancelTextStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.signOutButton]}
                  onPress={handleSignOut}
                >
                  <Text style={styles.signOutTextStyle}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity testID="logout" onPress={() => setModalVisible(true)}>
        <MaterialIcons name="logout" size={22} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default SignOut;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    flexDirection: "row",
  },
  cancelButton: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "lightgray",
  },
  signOutButton: {
    borderRadius: 12,
    padding: 12,
    marginLeft: 5,
    backgroundColor: "#D58258",
  },
  cancelTextStyle: {
    color: "white",
    textAlign: "center",
  },
  signOutTextStyle: {
    color: "white",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
