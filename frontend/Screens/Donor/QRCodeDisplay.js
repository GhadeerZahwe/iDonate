import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const QRCodeDisplay = ({ data, onSave }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.qrCodeText}>{data}</Text>
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  qrCodeText: {
    fontSize: 18,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#146C94",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default QRCodeDisplay;
