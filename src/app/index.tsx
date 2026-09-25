import { Text, View, Image, StyleSheet, Animated } from "react-native";
import { router } from "expo-router";
import { useEffect, useRef } from "react";

const index = () => {
  // Animated value starts at 8
  const width = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    // Start the bar animation
    Animated.timing(width, {
      toValue: 100,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    // Go to login after 2 seconds
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 4000);

    // Clean up timer if screen is removed
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo/app_logo.jpeg")}
        style={styles.logo}
      />

      <Text style={styles.subtitile}>
        Your Health Our Care
      </Text>

      <View style={styles.bars}>
        <Animated.View
          style={[
            styles.bar,
            { width: width },
          ]}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 260,
    height: 240,
    marginBottom: 10,
  },

  subtitile: {
    fontSize: 20,
    color: "#333",
  },

  bars: {
    alignItems: "center",
  },

  bar: {
    marginTop: 30,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0C32A6",
  },
});
