import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import {
  HeartPulse,
  Stethoscope,
  Baby,
  VenusAndMars,
  Bone,
  Ear,
  Brain,
  UserRound,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const categories = [
  {
    name: "Cardiology",
    doctors: "12 Doctors",
    icon: HeartPulse,
    color: "#FEE2E2",
    iconColor: "#EF4444",
  },
  {
    name: "Dermatology",
    doctors: "30 Doctors",
    icon: Stethoscope,
    color: "#FFF1E8",
    iconColor: "#F59E0B",
  },
  {
    name: "Pediatrics",
    doctors: "10 Doctors",
    icon: Baby,
    color: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    name: "Gynecology",
    doctors: "11 Doctors",
    icon: VenusAndMars,
    color: "#FCE7F3",
    iconColor: "#D946EF",
  },
  {
    name: "Orthopedics",
    doctors: "9 Doctors",
    icon: Bone,
    color: "#E0F2FE",
    iconColor: "#2563EB",
  },
  {
    name: "ENT",
    doctors: "7 Doctors",
    icon: Ear,
    color: "#FCE7F3",
    iconColor: "#EC4899",
  },
  {
    name: "Neurology",
    doctors: "6 Doctors",
    icon: Brain,
    color: "#FEE2E2",
    iconColor: "#EF4444",
  },
  {
    name: "General Physician",
    doctors: "16 Doctors",
    icon: UserRound,
    color: "#DCFCE7",
    iconColor: "#16A34A",
  },
];

export default function DoctorCategories() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid}>
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Pressable
              key={category.name}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() =>
                router.push({
                  pathname: "/DoctorList",
                  params: {
                    category: category.name,
                  },
                })
              }
            >
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor: category.color,
                  },
                ]}
              >
                <Icon
                  size={25}
                  color={category.iconColor}
                  strokeWidth={2}
                />
              </View>

              <Text style={styles.categoryName}>
                {category.name}
              </Text>

              <Text style={styles.doctorCount}>
                {category.doctors}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 25,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: (width - 42) / 2,
    height: 155,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,

    elevation: 1,
  },

  cardPressed: {
    transform: [{ scale: 0.97 }],
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  categoryName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#183B6B",
    textAlign: "center",
    marginBottom: 5,
  },

  doctorCount: {
    fontSize: 11,
    color: "#7B8794",
    fontWeight: "500",
  },
});