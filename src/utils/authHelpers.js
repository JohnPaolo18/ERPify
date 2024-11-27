import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkTokenValidity = async () => {
  const expirationDate = await AsyncStorage.getItem("expirationDate");
  const currentTime = Date.now();

  if (!expirationDate || currentTime >= parseInt(expirationDate)) {
    console.log("Token expired. Prompting user to log in again.");
    return false;
  }

  return true;
};
