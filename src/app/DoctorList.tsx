import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Star, CheckCircle } from "lucide-react-native";

const doctors = [
  {
    id: "1",
    name: "Dr. Rajesh Mehta",
    specialty: "Cardiologist",
    experience: "15 Years Experience",
    rating: "4.8",
    reviews: "330 reviews",
    available: true,
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    experience: "12 Years Experience",
    rating: "4.6",
    reviews: "210 reviews",
    available: true,
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Dr. Amit Verma",
    specialty: "Interventional Cardiologist",
    experience: "19 Years Experience",
    rating: "4.7",
    reviews: "190 reviews",
    available: true,
    image:
      "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: "4",
    name: "Dr. Neha Kapoor",
    specialty: "Pediatric Cardiologist",
    experience: "10 Years Experience",
    rating: "4.8",
    reviews: "120 reviews",
    available: false,
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function DoctorList() {
  const { category } = useLocalSearchParams();

  const categoryName =
    typeof category === "string" && category.length > 0
      ? category
      : "Cardiology";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `${categoryName} Doctors`,
          headerTitleAlign: "center",
          headerTintColor: "#000",

          headerSearchBarOptions: {
            placeholder: "Search doctors...",
            barTintColor: "#F3F7FA",
            textColor: "#1F2937",
            hintTextColor: "#8A94A6",
            headerIconColor: "#000",
          },
        }}
      />

      <View style={styles.container}>
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.doctorCard,
                pressed && styles.pressed,
              ]}
            >
              {/* Doctor Image */}
              <Image
                source={{ uri: item.image }}
                style={styles.doctorImage}
              />

              {/* Doctor Information */}
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>
                  {item.name}
                </Text>

                <Text style={styles.specialty}>
                  {item.specialty}
                </Text>

                <Text style={styles.experience}>
                  {item.experience}
                </Text>

                <View style={styles.ratingRow}>
                  <Star
                    size={14}
                    color="#F4B400"
                    fill="#F4B400"
                  />

                  <Text style={styles.rating}>
                    {item.rating}
                  </Text>

                  <Text style={styles.reviews}>
                    ({item.reviews})
                  </Text>
                </View>
              </View>

              {/* Availability */}
              <View
                style={[
                  styles.availableBadge,
                  !item.available && styles.unavailableBadge,
                ]}
              >
                <CheckCircle
                  size={11}
                  color={item.available ? "#159447" : "#E53935"}
                />

                <Text
                  style={[
                    styles.availableText,
                    !item.available && styles.unavailableText,
                  ]}
                >
                  {item.available ? "Available" : "Busy"}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  list: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 25,
  },

  doctorCard: {
    minHeight: 118,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E7EBEF",
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 9,
    paddingHorizontal: 9,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,

    elevation: 1,
  },

  pressed: {
    opacity: 0.8,
  },

  doctorImage: {
    width: 72,
    height: 88,
    borderRadius: 10,
    backgroundColor: "#EAF1F5",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 11,
    alignSelf: "center",
  },

  doctorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: 4,
  },

  specialty: {
    fontSize: 12,
    color: "#617086",
    marginBottom: 3,
  },

  experience: {
    fontSize: 11,
    color: "#6F7D8C",
    marginBottom: 5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    fontSize: 11,
    fontWeight: "600",
    color: "#555F6D",
    marginLeft: 4,
  },

  reviews: {
    fontSize: 10,
    color: "#8A94A6",
    marginLeft: 3,
  },

  availableBadge: {
    position: "absolute",
    right: 8,
    bottom: 9,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#DDF7E8",
    borderRadius: 10,

    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  unavailableBadge: {
    backgroundColor: "#FFE4E4",
  },

  availableText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#159447",
    marginLeft: 3,
  },

  unavailableText: {
    color: "#E53935",
  },
});