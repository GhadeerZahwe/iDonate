import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

const QRCodeAlert = ({ visible, onClose, qrCodeContent }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.alertContainer}>
        <QRCode
          value={qrCodeContent}
          size={200}
          color="black"
          backgroundColor="white"
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 20,
    bottom: 0, // Cover the entire screen
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "start",
    alignItems: "center",
    borderRadius: 10,
  },
  alertContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    top: 130,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#146C94",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    left: 17,
  },
});

export default QRCodeAlert;
