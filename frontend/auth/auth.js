import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  const token = await retrieveData();
  return token;
};
