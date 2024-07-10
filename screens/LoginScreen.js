import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
 const [Email, setEmail] = useState("");
 const [Password, setPassword] = useState("");
 const navigation = useNavigation();
 const isEmailValid = (Email) => {
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(Email).toLowerCase());
 };
 const handleLogin = async () => {
   try {
     if (!Email) {
       Alert.alert("กรุณากรอกอีเมล!");
     } else if (!isEmailValid(Email)) {
       Alert.alert("รูปแบบอีเมลไม่ถูกต้อง!");
     } else if (!Password) {
       Alert.alert("กรุณากรอกรหัสผ่าน!");
     } else {
       const response = await fetch(
         "http://mgt2.pnu.ac.th/jakpong/6460704003/login.php",
         {
           method: "POST",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             email: Email,
             password: Password,
           }),
         }
       );
       const data = await response.json();
       //console.log(data.users[0].id)
       //let id = data.users[0].id;
       if (data.users[0].status === "users") {
         navigation.navigate("UserPage", { Email: Email });
       } else if (data.users[0].status === "admin") {
         navigation.navigate("AdminPage");
       } else {
         Alert.alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
       }
     }
   } catch (error) {
     console.error(error);
   }
 };
 return (
   <View style={styles.container}>
     <Text style={styles.logo}>ล็อกอิน</Text>
     <View style={styles.inputView}>
       <TextInput
         style={styles.inputText}
         placeholder="อีเมล"
         placeholderTextColor="#003f5c"
         onChangeText={(Email) => setEmail(Email)}
       ></TextInput>
     </View>
     <View style={styles.inputView}>
       <TextInput
         style={styles.inputText}
         placeholder="รหัสผ่าน"
         placeholderTextColor="#003f5c"
         onChangeText={(Password) => setPassword(Password)}
         secureTextEntry={true}
       ></TextInput>
     </View>
     <TouchableOpacity>
       <Text style={styles.forgot}>หรือ</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
       <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => navigation.navigate("Register")}>
       <Text style={styles.registerText}>สมัครสมาชิก</Text>
     </TouchableOpacity>
   </View>
 );
};
export default LoginScreen;