import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Star,
  ChevronLeft,
  Send,
} from "lucide-react-native";

/*
|--------------------------------------------------------------------------
| Backend-ready types
|--------------------------------------------------------------------------
| Later these values can come directly from your API/database.
*/

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  image: string;
};

type Appointment = {
  id: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "upcoming" | "completed" | "cancelled";
};

/*
|--------------------------------------------------------------------------
| Temporary doctor data
|--------------------------------------------------------------------------
| Replace with API data later.
*/

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Mehta",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Dr. Amit Verma",
    specialty: "Interventional Cardiologist",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: "4",
    name: "Dr. Neha Kapoor",
    specialty: "Pediatric Cardiologist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

/*
|--------------------------------------------------------------------------
| Temporary appointment data
|--------------------------------------------------------------------------
| Later this should come from:
|
| GET /appointments/:appointmentId
|
*/

const appointments: Appointment[] = [
  {
    id: "JDSQ300012.001",
    doctorId: "2",
    appointmentDate: "12 Sep 2026",
    appointmentTime: "10:00 AM",
    status: "completed",
  },
  {
    id: "JDSQ300012.002",
    doctorId: "3",
    appointmentDate: "20 Sep 2026",
    appointmentTime: "11:30 AM",
    status: "completed",
  },
  {
    id: "JDSQ300012.003",
    doctorId: "4",
    appointmentDate: "08 Oct 2026",
    appointmentTime: "04:00 PM",
    status: "upcoming",
  },
];

export default function Rating() {
  const params = useLocalSearchParams();

  /*
  |--------------------------------------------------------------------------
  | Appointment ID
  |--------------------------------------------------------------------------
  | MyAppointments will pass this when the user taps "Rate".
  */

  const appointmentId =
    typeof params.appointmentId === "string"
      ? params.appointmentId
      : "JDSQ300012.001";

  /*
  |--------------------------------------------------------------------------
  | Find appointment
  |--------------------------------------------------------------------------
  */

  const appointment = useMemo(() => {
    return appointments.find(
      (item) => item.id === appointmentId
    );
  }, [appointmentId]);

  /*
  |--------------------------------------------------------------------------
  | Find doctor
  |--------------------------------------------------------------------------
  */

  const doctor = useMemo(() => {
    if (!appointment) {
      return doctors[1];
    }

    return (
      doctors.find(
        (item) => item.id === appointment.doctorId
      ) ?? doctors[1]
    );
  }, [appointment]);

  /*
  |--------------------------------------------------------------------------
  | Rating state
  |--------------------------------------------------------------------------
  */

  const [rating, setRating] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | Feedback state
  |--------------------------------------------------------------------------
  */

  const [feedback, setFeedback] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Submit feedback
  |--------------------------------------------------------------------------
  | Later:
  |
  | POST /reviews
  |
  | {
  |   appointmentId,
  |   doctorId,
  |   rating,
  |   feedback
  | }
  |--------------------------------------------------------------------------
  */

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert(
        "Rating Required",
        "Please select a rating before submitting."
      );

      return;
    }

    const reviewPayload = {
      appointmentId,
      doctorId: doctor.id,
      rating,
      feedback: feedback.trim(),
    };

    /*
    |--------------------------------------------------------------------------
    | Backend integration goes here later
    |--------------------------------------------------------------------------
    |
    | Example:
    |
    | await createDoctorReview(reviewPayload);
    |
    */

    console.log("Review payload:", reviewPayload);

    Alert.alert(
      "Thank You!",
      "Your feedback has been submitted successfully.",
      [
        {
          text: "Done",
          onPress: () => router.back(),
        },
      ]
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Rating label
  |--------------------------------------------------------------------------
  */

  const ratingLabel = () => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Rate Your Experience";
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Rating & Feedback",
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Doctor Card */}

          <View style={styles.doctorCard}>
            <Image
              source={{ uri: doctor.image }}
              style={styles.doctorImage}
            />

            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>
                {doctor.name}
              </Text>

              <Text style={styles.specialty}>
                {doctor.specialty}
              </Text>

              {appointment && (
                <Text style={styles.appointmentInfo}>
                  {appointment.appointmentDate} ·{" "}
                  {appointment.appointmentTime}
                </Text>
              )}
            </View>

            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>
                Completed
              </Text>
            </View>
          </View>

          {/* Rating */}

          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>
              {ratingLabel()}
            </Text>

            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((value) => {
                const selected = value <= rating;

                return (
                  <Pressable
                    key={value}
                    onPress={() => setRating(value)}
                    style={styles.starButton}
                    hitSlop={6}
                  >
                    <Star
                      size={34}
                      color={
                        selected
                          ? "#F4B400"
                          : "#B8C0CA"
                      }
                      fill={
                        selected
                          ? "#F4B400"
                          : "transparent"
                      }
                      strokeWidth={1.7}
                    />
                  </Pressable>
                );
              })}
            </View>

            {rating > 0 && (
              <Text style={styles.ratingDescription}>
                You rated this appointment {rating}{" "}
                {rating === 1 ? "star" : "stars"}.
              </Text>
            )}
          </View>

          {/* Feedback */}

          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackTitle}>
              Write Your Feedback
              <Text style={styles.optional}>
                {" "}
                (Optional)
              </Text>
            </Text>

            <TextInput
              value={feedback}
              onChangeText={setFeedback}
              placeholder="Share your experience, how was your consultation?"
              placeholderTextColor="#A3ACB8"
              multiline
              textAlignVertical="top"
              maxLength={500}
              style={styles.feedbackInput}
            />

            <Text style={styles.characterCount}>
              {feedback.length}/500
            </Text>
          </View>

          {/* Submit */}

          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Send
              size={17}
              color="#FFFFFF"
              strokeWidth={2}
            />

            <Text style={styles.submitButtonText}>
              Submit Feedback
            </Text>
          </Pressable>

          {/* Previous Feedback */}

          <View style={styles.previousSection}>
            <Text style={styles.previousTitle}>
              Your Previous Feedback
            </Text>

            <View style={styles.previousCard}>
              <View style={styles.previousHeader}>
                <View style={styles.previousStars}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      size={14}
                      color="#F4B400"
                      fill="#F4B400"
                      strokeWidth={1.5}
                    />
                  ))}
                </View>

                <Text style={styles.previousDate}>
                  15 Aug 2026
                </Text>
              </View>

              <Text style={styles.previousText}>
                Very professional and excellent consultation.
                Everything was explained clearly.
              </Text>
            </View>
          </View>

          {/* Bottom spacing */}

          <View style={{ height: 25 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingHorizontal: 14,
    paddingTop: 9,
    paddingBottom: 25,
  },

  /*
  |--------------------------------------------------------------------------
  | Doctor card
  |--------------------------------------------------------------------------
  */

  doctorCard: {
    minHeight: 82,
    borderWidth: 1,
    borderColor: "#E6EBF0",
    borderRadius: 11,
    padding: 9,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  doctorImage: {
    width: 58,
    height: 65,
    borderRadius: 9,
    backgroundColor: "#EEF3F7",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 10,
  },

  doctorName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 3,
  },

  specialty: {
    fontSize: 10,
    color: "#687789",
    marginBottom: 3,
  },

  appointmentInfo: {
    fontSize: 9,
    color: "#8993A0",
  },

  completedBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E6F7EE",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 9,
  },

  completedText: {
    fontSize: 8,
    fontWeight: "600",
    color: "#159447",
  },

  /*
  |--------------------------------------------------------------------------
  | Rating
  |--------------------------------------------------------------------------
  */

  ratingSection: {
    marginTop: 20,
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 12,
  },

  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  starButton: {
    paddingHorizontal: 4,
  },

  ratingDescription: {
    fontSize: 10,
    color: "#7B8794",
    marginTop: 8,
  },

  /*
  |--------------------------------------------------------------------------
  | Feedback
  |--------------------------------------------------------------------------
  */

  feedbackSection: {
    marginTop: 23,
  },

  feedbackTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 8,
  },

  optional: {
    fontSize: 11,
    fontWeight: "500",
    color: "#8993A0",
  },

  feedbackInput: {
    minHeight: 125,
    borderWidth: 1,
    borderColor: "#E0E6EB",
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 10,
    fontSize: 11,
    color: "#344054",
    backgroundColor: "#FFFFFF",
  },

  characterCount: {
    fontSize: 9,
    color: "#9AA4B2",
    textAlign: "right",
    marginTop: 4,
  },

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  submitButton: {
    height: 47,
    borderRadius: 9,
    backgroundColor: "#12A66A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  buttonPressed: {
    opacity: 0.82,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 7,
  },

  /*
  |--------------------------------------------------------------------------
  | Previous feedback
  |--------------------------------------------------------------------------
  */

  previousSection: {
    marginTop: 23,
  },

  previousTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 9,
  },

  previousCard: {
    borderWidth: 1,
    borderColor: "#E6EBF0",
    borderRadius: 10,
    padding: 11,
    backgroundColor: "#FFFFFF",
  },

  previousHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  previousStars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  previousDate: {
    fontSize: 9,
    color: "#8A94A6",
  },

  previousText: {
    fontSize: 10,
    lineHeight: 16,
    color: "#697586",
  },
});