import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import UseHttp from "../../hooks/request";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef();
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      return value !== null ? value : null;
    } catch (error) {
      // console.log(error);
      return null;
    }
  };

  const getToken = async () => {
    return await retrieveData();
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      return;
    }
    setLoading(true);
    // console.log(inputMessage);
    try {
      const token = await getToken();
      const response = await UseHttp(
        "sendChat",
        "POST",
        JSON.stringify({ prompt: inputMessage }),
        {
          Authorization: "bearer " + token,
          "Content-Type": "application/json",
        }
      );
      // console.log("Chat API Response:", response);

      if (!response) {
        throw new Error("No response received from the server.");
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: "user" },
        { text: response.response, sender: "bot" },
      ]);
      setInputMessage("");
      scrollToBottom();
    } catch (error) {
      // console.error("Error sending message:", error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Error: ${error.message}`, sender: "error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "Hello! How can I help you?", sender: "bot" },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              styles[`${message.sender}Message`],
              {
                alignSelf:
                  message.sender === "user" ? "flex-end" : "flex-start",
              },
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#f0f0f0",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 10,
  },
  message: {
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#146C94",
  },
  botMessage: {
    backgroundColor: "#19A7CE",
  },
  errorMessage: {
    backgroundColor: "#ff0000",
  },
  messageText: {
    fontSize: 16,
    color: "#ffffff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#146C94",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Chat;
