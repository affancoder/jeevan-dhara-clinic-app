import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {Link } from "expo-router";

const sign = () => {
  return (
    <View style={styles.container}>

      <ScrollView 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join Jeevan Dhara Clinic</Text>

      <View>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#1F48C4"
            style={styles.inputIcon}
          />
          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>Full Name</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your Full Name"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="phone-portrait-outline"
            size={20}
            color="#1F48C4"
            style={styles.inputIcon}
          />
          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>Mobile Number</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your Mobile Number"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#1F48C4"
            style={styles.inputIcon}
          />
          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>Email (Optional)</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#1F48C4"
            style={styles.inputIcon}
          />
          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Create a Password"
            />
          </View>
        </View>

        <View style={styles.signupBtn}>
          <Text style={{color :"#fff"}}>Sign Up</Text>
        </View>

        <View style={styles.loginText}>
          <Text style={{color : "#172F79"}}>Already have an account? <Link href="/login" style={styles.bottomText}>Login</Link></Text>
        </View>

      </View>
      </ScrollView>
    </View>
  );
};

export default sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent:{
    paddingBottom : 30,
  },
   title: {
    fontSize: 35,
    marginTop: 35,
    color: "#1F48C4",
    fontWeight: "semibold",
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#668fe0",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 70,
    marginBottom: -6,
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
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
    fontWeight: "bold",
  },
  input: {
    fontSize: 15,
    color: "#1a1a2e",
    padding: 0,
  },
  signupBtn : {
    backgroundColor : "#009355",
    height: 50,
    marginHorizontal: 20,
    marginTop: 80,
    marginBottom : 10,
    borderRadius: 12,
    justifyContent : "center",
    alignItems : "center",
  },
  loginText:{
    alignItems : "center",
  },
  bottomText:{
    fontWeight : "bold",
  }
});
