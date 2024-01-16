import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const CustomAlert = ({ visible, title, message, onYes, onNo }) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.noButton} onPress={onNo}>
              <Text style={styles.buttonTextNo}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yesButton} onPress={onYes}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#146C94",
  },
  alertContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#146C94",
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  noButton: {
    backgroundColor: "#BD2031",
    padding: 10,
    borderRadius: 5,
    width: 70,
  },
  yesButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    left: 5,
    width: 70,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    left: 12,
  },
  buttonTextNo: {
    color: "#fff",
    fontWeight: "bold",
    left: 16,
  },
});

export default CustomAlert;
