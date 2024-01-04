// import React, { useState } from "react";
// import { StyleSheet, View, Text, TextInput } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { TouchableOpacity } from "react-native";

// const Order = () => {
//   const [pickupWithin, setPickupWithin] = useState("6"); // Initial value for pickup time
//   const [inputValue, setInputValue] = useState(""); // Input value
//   const [phoneNumber, setPhoneNumber] = useState(""); // Phone number value
//   const [weightRange, setWeightRange] = useState([5, 10]); // Initial range
//   const weightOptions = [5, 10, 30, 50, 60];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Weight</Text>
//       <View style={styles.weightOptions}>
//         {weightOptions.map((weight, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => {
//               if (index === 0) {
//                 setWeightRange([weight, weight]); // Single value selection
//               } else {
//                 setWeightRange([weightOptions[index - 1], weight]); // Range selection
//               }
//             }}
//             style={[
//               styles.option,
//               index >= weightRange[0] &&
//                 index <= weightRange[1] &&
//                 styles.optionSelected,
//             ]}
//           >
//             <Text style={styles.optionText}>{weight}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Pickup Within section */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Pickup Within</Text>
//         <Picker
//           selectedValue={pickupWithin}
//           onValueChange={setPickupWithin}
//           style={styles.picker}
//         >
//           <Picker.Item label="6 Hrs" value="6" />
//           <Picker.Item label="8 Hrs" value="8" />
//           <Picker.Item label="24 Hrs" value="24" />
//         </Picker>
//       </View>

//       {/* Input field */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Input</Text>
//         <TextInput
//           value={inputValue}
//           onChangeText={setInputValue}
//           style={styles.TextInput}
//         />
//       </View>

//       {/* Phone number field */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           keyboardType="phone-pad"
//           style={styles.TextInput}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   TextInput: {
//     borderWidth: 1,
//     borderColor: "lightgray",
//     padding: 10,
//     marginBottom: 10,
//   },
//   picker: {
//     width: 150,
//   },
//   option: {
//     flex: 1,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "lightgray",
//     padding: 10,
//     marginRight: 5, // Adjust spacing between options
//   },
//   optionSelected: {
//     backgroundColor: "blue",
//   },
//   optionText: {
//     color: "white", // Ensure text is visible on blue background
//   },
// });

// export default Order;
