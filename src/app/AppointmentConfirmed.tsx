import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Check,
  CalendarDays,
  UserRound,
  Clock3,
  IndianRupee,
  ClipboardList,
} from "lucide-react-native";

export default function AppointmentConfirmed() {
  const params = useLocalSearchParams();

  /*
  |--------------------------------------------------------------------------
  | Appointment data
  |--------------------------------------------------------------------------
  | These values currently come from AppointmentBooking.tsx.
  |
  | Later, after backend integration, the API can return:
  |
  | {
  |   appointmentId,
  |   doctorId,
  |   doctorName,
  |   specialty,
  |   appointmentDate,
  |   appointmentTime,
  |   consultationFee
  | }
  |
  | Then this screen can use the API response without changing the UI.
  |--------------------------------------------------------------------------
  */

  const appointmentId =
    typeof params.appointmentId === "string"
      ? params.appointmentId
      : "JD-20260912-001";

  const doctorName =
    typeof params.doctorName === "string"
      ? params.doctorName
      : "Dr. Priya Sharma";

  const specialty =
    typeof params.specialty === "string"
      ? params.specialty
      : "Cardiologist";

  const appointmentDate =
    typeof params.date === "string"
      ? params.date
      : "2026-09-12";

  const appointmentTime =
    typeof params.time === "string"
      ? params.time
      : "10:00 AM";

  const consultationFee =
    typeof params.fee === "string"
      ? params.fee
      : "600";

  /*
  |--------------------------------------------------------------------------
  | Format date
  |--------------------------------------------------------------------------
  */

  const formattedDate = formatAppointmentDate(appointmentDate);

  /*
  |--------------------------------------------------------------------------
  | View appointment
  |--------------------------------------------------------------------------
  */

  const handleViewAppointment = () => {
    /*
      Later:

      router.push({
        pathname: "/MyAppointments",
        params: {
          appointmentId,
        },
      });

      The MyAppointments screen can then fetch the appointment
      from the backend using appointmentId.
    */

    router.push("/MyAppointments");
  };

  /*
  |--------------------------------------------------------------------------
  | Back to home
  |--------------------------------------------------------------------------
  */

  const handleBackHome = () => {
    router.replace("/home");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Success Icon */}
          <View style={styles.successOuter}>
            <View style={styles.successCircle}>
              <Check
                size={42}
                color="#FFFFFF"
                strokeWidth={3}
              />
            </View>
          </View>

          {/* Success Message */}
          <Text style={styles.title}>
            Appointment Confirmed!
          </Text>

          <Text style={styles.subtitle}>
            Your appointment has been
          </Text>

          <Text style={styles.subtitle}>
            successfully booked.
          </Text>

          {/* Appointment Details */}
          <View style={styles.detailsCard}>
            {/* Appointment ID */}
            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <ClipboardList
                  size={15}
                  color="#183B6B"
                />
              </View>

              <Text style={styles.detailLabel}>
                Appointment ID
              </Text>

              <Text
                style={styles.detailValue}
                numberOfLines={1}
              >
                {appointmentId}
              </Text>
            </View>

            {/* Doctor */}
            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <UserRound
                  size={15}
                  color="#183B6B"
                />
              </View>

              <Text style={styles.detailLabel}>
                Doctor
              </Text>

              <View style={styles.valueColumn}>
                <Text
                  style={styles.detailValue}
                  numberOfLines={1}
                >
                  {doctorName}
                </Text>

                <Text style={styles.secondaryValue}>
                  {specialty}
                </Text>
              </View>
            </View>

            {/* Date & Time */}
            <View style={styles.detailRow}>
              <View style={styles.iconBox}>
                <CalendarDays
                  size={15}
                  color="#183B6B"
                />
              </View>

              <Text style={styles.detailLabel}>
                Date & Time
              </Text>

              <View style={styles.valueColumn}>
                <Text style={styles.detailValue}>
                  {formattedDate}
                </Text>

                <Text style={styles.secondaryValue}>
                  {appointmentTime}
                </Text>
              </View>
            </View>

            {/* Consultation Fee */}
            <View
              style={[
                styles.detailRow,
                styles.lastDetailRow,
              ]}
            >
              <View style={styles.iconBox}>
                <IndianRupee
                  size={15}
                  color="#183B6B"
                />
              </View>

              <Text style={styles.detailLabel}>
                Consultation Fee
              </Text>

              <Text style={styles.detailValue}>
                ₹ {consultationFee}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={handleViewAppointment}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                View My Appointment
              </Text>
            </Pressable>

            <Pressable
              onPress={handleBackHome}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>
                Back to Home
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

/*
|--------------------------------------------------------------------------
| Date formatter
|--------------------------------------------------------------------------
*/

function formatAppointmentDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex : 1,
    justifyContent: "center",
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingTop: 28,
    paddingBottom: 30,
    alignItems: "center",
  },

  /*
  |--------------------------------------------------------------------------
  | Success
  |--------------------------------------------------------------------------
  */

  successOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#E8F3FC",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    marginBottom: 15,
  },

  successCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#16A86B",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#16A86B",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 3,
  },

  /*
  |--------------------------------------------------------------------------
  | Title
  |--------------------------------------------------------------------------
  */

  title: {
    fontSize: 19,
    fontWeight: "800",
    color: "#183B6B",
    textAlign: "center",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: "#718096",
    textAlign: "center",
  },

  /*
  |--------------------------------------------------------------------------
  | Details card
  |--------------------------------------------------------------------------
  */

  detailsCard: {
    width: "100%",
    marginTop: 20,

    backgroundColor: "#F9FBFC",

    borderWidth: 1,
    borderColor: "#E7EDF1",

    borderRadius: 11,

    paddingHorizontal: 11,
    paddingVertical: 5,
  },

  detailRow: {
    minHeight: 54,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F4",
  },

  lastDetailRow: {
    borderBottomWidth: 0,
  },

  iconBox: {
    width: 29,
    height: 29,
    borderRadius: 8,

    backgroundColor: "#EDF4F9",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 9,
  },

  detailLabel: {
    width: 86,

    fontSize: 9,
    color: "#8A94A6",
    fontWeight: "500",
  },

  detailValue: {
    flex: 1,

    fontSize: 10,
    color: "#26364A",
    fontWeight: "700",

    textAlign: "right",
  },

  valueColumn: {
    flex: 1,
    alignItems: "flex-end",
  },

  secondaryValue: {
    fontSize: 9,
    color: "#718096",
    marginTop: 2,
  },

  /*
  |--------------------------------------------------------------------------
  | Buttons
  |--------------------------------------------------------------------------
  */

  buttonsContainer: {
    width: "100%",
    marginTop: 18,
  },

  primaryButton: {
    height: 46,

    backgroundColor: "#16A86B",

    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 8,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  secondaryButton: {
    height: 46,

    backgroundColor: "#FFFFFF",

    borderWidth: 1.5,
    borderColor: "#16A86B",

    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#16A86B",
    fontSize: 12,
    fontWeight: "700",
  },

  buttonPressed: {
    opacity: 0.78,
  },
});