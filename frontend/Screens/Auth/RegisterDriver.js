import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import RegisterLogo from "../../components/RegisterLogo/RegisterLogo";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import UseHttp from "../../hooks/request";
import { useDispatch } from "react-redux";
import { login, setUserData } from "../../redux/slices/authSlice";
import WeightAlert from "../../components/WeightAlert/WeightAlert";

export default function RegisterDriver() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [first_name, setfirstName] = useState("Ali");
  const [last_name, setLastName] = useState("Zahwe");
  const [email, setEmail] = useState("Ali2024@gmail.com");
  const [phone, setPhone] = useState("+961| 03909632");
  const [password, setPassword] = useState("code123");
  const [license_number, setLicenseNumber] = useState("F515F");
  const [profile, setProfile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, Camera roll permissions needed to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      const cacheDirectory = FileSystem.cacheDirectory;
      const fileName = result.assets[0].uri.split("/").pop();
      const filePath = `${cacheDirectory}${fileName}`;
      try {
        await FileSystem.copyAsync({
          from: result.assets[0].uri,
          to: filePath,
        });

        setProfile(filePath);
      } catch (error) {
        // console.error(error);
      }
    }
  };
  const dispatch = useDispatch();

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("license_number", license_number);
    formData.append("user_type", "delivery");

    const result = await UseHttp("register", "POST", formData, {
      "Content-Type": "multipart/form-data",
    });

    if (result.status === "success") {
      setRegistrationSuccess(true);
    } else {
      alert("Wrong credentials");
    }
  };

  const closeRegistrationSuccess = () => {
    setRegistrationSuccess(false);
  };
  return (
    <ScrollView style={{ backgroundColor: "#F6F1F1", flex: 1 }}>
      <View style={{ top: -40 }}>
        <RegisterLogo />
      </View>

      <View style={{ gap: 15, marginBottom: 450 }}>
        <TextInput
          style={styles.first_name}
          placeholder="  First Name"
          onChangeText={(e) => {
            setfirstName(e);
          }}
        />
        <TextInput
          style={styles.last_name}
          placeholder="  Last Name"
          onChangeText={(e) => {
            setLastName(e);
          }}
        />
        <TextInput
          style={styles.Email}
          placeholder="  Email"
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <TextInput
          style={styles.Password}
          secureTextEntry={!showPassword}
          placeholder="  Password"
          onChangeText={(e) => {
            setPassword(e);
          }}
        />
        <TextInput
          style={styles.licence}
          placeholder="  Licence Number"
          onChangeText={(e) => {
            setLicenseNumber(e);
          }}
        />

        {/* <TouchableOpacity onPress={handleChoosePhoto}>
          <View style={styles.imageUpload}>
            <View style={{ top: 10, marginBottom: 8 }}>
              <Feather name="image" size={30} color={"#146C94"} />
            </View>
            <View>
              <Text>Choose Photo</Text>
              {selectedImage !== null && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: 100,
                    height: 90,
                    left: 210,
                    top: 0,
                    borderRadius: 15,
                  }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.register_btn} onPress={handleRegister}>
          <Text
            style={{
              fontSize: 24,
              color: "#FFF",
              top: 8,
              left: 110,
              fontWeight: 500,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>

        {registrationSuccess && (
          <WeightAlert
            visible={registrationSuccess}
            title="Registration Successful"
            message="Your registration is successful. Please wait for admin approval."
            onClose={closeRegistrationSuccess}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  first_name: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 150,
    borderRadius: 10,
    top: 245,
    left: 26,
    elevation: 1,
    marginBottom: 13,
  },
  last_name: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 152,
    borderRadius: 10,
    top: 169,
    left: 185,
    elevation: 1,
    marginBottom: 11,
  },
  Email: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 313,
    borderRadius: 10,
    top: 160,
    left: 26,
    elevation: 1,
  },
  Password: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 315,
    borderRadius: 10,
    top: 160,
    left: 26,
    elevation: 1,
  },
  licence: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 315,
    borderRadius: 10,
    top: 160,
    left: 26,
    elevation: 1,
    marginBottom: 60,
  },
  register_btn: {
    backgroundColor: "#146C94",
    width: 313,
    height: 50,
    top: 110,
    left: 27,
    borderRadius: 10,
    elevation: 1,
  },
  imageUpload: {
    top: 90,
    left: 30,
    marginBottom: 30,
  },
});
