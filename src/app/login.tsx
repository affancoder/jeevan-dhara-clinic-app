import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, Button} from "react-native";
import { Link, useRouter } from "expo-router";


const login = () => {

  const router = useRouter();
  const [email1Ormobile, setEmail1Ormobile] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    // Title
    <View style={styles.container}>
      <Button title="Temporary: Open Home"
      onPress={() => router.push("/home") }/>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitile}>Log in to your account</Text>

      <View style={styles.inputWrapper}>
        <Ionicons
          name="phone-portrait-outline"
          size={20}
          color="#6C63FF"
          style={styles.inputIcon}
        />

        <View style={styles.inputContent}>
          <Text style={styles.inputLabel}>Mobile Number / Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Mobile number or Email"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View style={styles.inputWrapper2}>

        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#6C63FF"
          style={styles.inputIcon}
        />

        <View style={styles.inputContent}>
          <Text style={styles.inputLabel}>Password</Text>

        <View style={styles.passwordInput}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Enter your Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
          />

        <Pressable onPress={() => setShowPassword(!showPassword)}>

        

        <Ionicons
          name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#333"
          style={styles.eyeToggle}
        />


        </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.forget}>
        <Link href="/forget"><Text style={styles.forgetPassword}>Forget Password ?</Text></Link>
      </View>

      <View style={styles.greenBtn}>
        <Text style={styles.loginText}>Login</Text>
      </View>

      <View style={styles.dividerRow}>
          <View style={styles.dividerLine}/>
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine}/>
      </View>

      <View style={styles.otpBtn}>
        <Ionicons
        name="phone-portrait-outline"
        size={22}
        color="#009355"
        style={styles.phoneIcon}
        />
        
        <Text style={styles.otpText}>Login with OTP</Text>

      </View>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Link href="/sign" style={{color : "#172F79", fontWeight : "bold", fontSize:16}}>Sign Up</Link>
      </View>

    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 35,
    color: "#1F48C4",
    textAlign: "center",
    fontWeight: "600",
  },
  subtitile: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#668fe0",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 70,
    marginBottom: 18,
    marginTop: 50,
    margin: 20,
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e57a8",
  },
  inputContent: {
    flex: 1,
    justifyContent: "center",
  },
  inputLabel: {
    fontSize: 15,
    color: "#333",
    marginBottom: 2,
    fontWeight : "bold",
  },
  input: {
    fontSize: 15,
    color: "#1a1a2e",
    padding: 0,
  },
  inputPassword:{
    flex : 1,
    padding : 0,
  },
  inputWrapper2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#668fe0",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 70,
    marginHorizontal: 20,
  },
  eye:{
    marginLeft : "auto",
    paddingLeft:10,
  },
  eyeToggle:{
    fontSize: 24,
    color : "#333",
  },
  forget:{
    marginTop : 10,
    marginHorizontal:20,
  },
  forgetPassword: {
    textAlign: "right",
    margin: 20,
    color: "#133AB2",
    fontSize: 16,
    fontWeight: "600",
  },
  greenBtn: {
    backgroundColor: "#009355",
    width: 320,
    height: 54,
    margin: 20,
    top: 26,
    borderRadius: 12,
    justifyContent: "center",
    alignItems : "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 20,
  },

  dividerRow:{
    flexDirection: "row",
    alignItems:"center",
    marginHorizontal: 20,
    marginTop: 40,
  },

  dividerLine:{
    flex:1,
    height: 1,
    backgroundColor : "#333"
  },

  dividerText:{
    marginHorizontal: 8,
    fontSize : 16,
  },

  otpBtn:{
    marginTop: 20,
    height: 56,
    marginHorizontal:20,
    borderRadius : 12,
    justifyContent : "center",
    alignItems: "center",
    flexDirection : "row",
    backgroundColor : "#e6ffea",
    borderColor: "#111",
    borderWidth : 0.5,
  },

  phoneIcon:{
    marginRight: 6,
    fontWeight:"bold",
    fontSize : 24,
  },

  otpText:{
    // fontWeight : "700",
    fontSize:16,
  },

  signupRow:{
    flexDirection : "row",
    justifyContent:"center",
    marginTop: 6,
  },

  signupText:{
    fontSize: 16,
    // color : "#172F79",
  },
  passwordInput: {
  flexDirection: "row",
},
});
