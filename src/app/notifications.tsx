import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { Stack, router } from "expo-router";
import {
  Bell,
  CalendarCheck2,
  Clock3,
  CheckCircle2,
  Info,
  Trash2,
  CheckCheck,
  ChevronRight,
  MessageCircle,
} from "lucide-react-native";

/* ==================== TYPES ==================== */

type NotificationType =
  | "appointment"
  | "reminder"
  | "success"
  | "NewFeedback"
  | "calender"
  | "info";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  appointmentId?: string;
  doctorId?: string;
};

/* ==================== MOCK DATA ==================== */
/*
  This data is temporary.

  Later:
  - notifications will come from backend/API
  - read status will come from database
  - appointmentId/doctorId will come from backend
*/

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "appointment",
    title: "Appointment Confirmed",
    message:
      "Your appointment with Dr. Rajesh Mehta has been confirmed.",
    date: "Today",
    time: "10:30 AM",
    read: false,
    appointmentId: "APT001",
    doctorId: "1",
  },
  {
    id: "2",
    type: "reminder",
    title: "Appointment Reminder",
    message:
      "Your appointment with Dr. Priya Sharma is tomorrow at 11:00 AM.",
    date: "Today",
    time: "09:00 AM",
    read: false,
    appointmentId: "APT002",
    doctorId: "2",
  },
  {
    id: "3",
    type: "success",
    title: "Appointment Completed",
    message:
      "Your appointment with Dr. Amit Verma was completed successfully.",
    date: "Yesterday",
    time: "06:15 PM",
    read: true,
    appointmentId: "APT003",
    doctorId: "3",
  },
  {
    id: "4",
    type: "NewFeedback",
    title: "New Feedback",
    message:
      "Your appointment with Dr. Neha Kapoor has received new feedback.",
    date: "22 Sep 2026",
    time: "03:20 PM",
    read: true,
    appointmentId: "APT004",
    doctorId: "4",
  },
  {
    id: "5",
    type: "calender",
    title: "Clinic Update",
    message:
      "Orthopedic clinic will be closed on 2nd October 2026 due to a public holiday.",
    date: "20 Sep 2026",
    time: "10:00 AM",
    read: true,
  },
];

/* ==================== COMPONENT ==================== */

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  /* ==================== UNREAD COUNT ==================== */

  const unreadCount = useMemo(() => {
    return notifications.filter((item) => !item.read).length;
  }, [notifications]);

  /* ==================== MARK AS READ ==================== */

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );
  };

  /* ==================== MARK ALL AS READ ==================== */

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  /* ==================== DELETE ==================== */

  const deleteNotification = (id: string) => {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  /* ==================== NOTIFICATION ICON ==================== */

  const renderNotificationIcon = (
    type: NotificationType
  ) => {
    switch (type) {
      case "appointment":
        return <CalendarCheck2 size={21} color="#2563EB" />;

      case "reminder":
        return <Clock3 size={21} color="#F59E0B" />;

      case "success":
        return <CheckCircle2 size={21} color="#16A34A" />;

      case "NewFeedback":
        return <MessageCircle size={21} color="#2647DC" />;

      case "calender":
        return <Bell size={21} color="#7C3AED" />;

      case "info":
      default:
        return <Info size={21} color="#7C3AED" />;
    }
  };

  /* ==================== ICON BACKGROUND ==================== */

  const getIconBackground = (
    type: NotificationType
  ) => {
    switch (type) {
      case "appointment":
        return "#E8F1FF";

      case "reminder":
        return "#FFF4DD";

      case "success":
        return "#E4F7EC";

      case "NewFeedback":
        return "#deeaff";

      case "calender":
      case "info":
      default:
        return "#F0EAFE";
    }
  };

  /* ==================== NOTIFICATION PRESS ==================== */

  const handleNotificationPress = (
    item: NotificationItem
  ) => {
    markAsRead(item.id);

    /*
      Later backend can provide appointmentId.
      This keeps the notification system ready for
      appointment-specific navigation.
    */

    if (item.appointmentId) {
      router.push({
        pathname: "/AppointmentConfirmed",
        params: {
          appointmentId: item.appointmentId,
        },
      });
    }
  };

  /* ==================== RENDER ITEM ==================== */

  const renderNotification = ({
    item,
  }: {
    item: NotificationItem;
  }) => {
    return (
      <Pressable
        onPress={() => handleNotificationPress(item)}
        style={[
          styles.notificationCard,
          !item.read && styles.unreadCard,
        ]}
      >
        {/* ==================== ICON ==================== */}

        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                getIconBackground(item.type),
            },
          ]}
        >
          {renderNotificationIcon(item.type)}
        </View>

        {/* ==================== CONTENT ==================== */}

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                !item.read && styles.unreadTitle,
              ]}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            {!item.read && (
              <View style={styles.unreadDot} />
            )}
          </View>

          <Text
            style={styles.message}
            numberOfLines={2}
          >
            {item.message}
          </Text>

          <Text style={styles.date}>
            {item.date} • {item.time}
          </Text>
        </View>

        {/* ==================== ACTIONS ==================== */}

        <View style={styles.actionsContainer}>
          <Pressable
            onPress={() =>
              deleteNotification(item.id)
            }
            hitSlop={8}
            style={styles.deleteButton}
          >
            <Trash2
              size={16}
              color="#9AA3AE"
            />
          </Pressable>

          <ChevronRight
            size={18}
            color="#AAB2BC"
          />
        </View>
      </Pressable>
    );
  };

  /* ==================== EMPTY STATE ==================== */

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Bell
            size={28}
            color="#7C3AED"
          />
        </View>

        <Text style={styles.emptyTitle}>
          No notifications
        </Text>

        <Text style={styles.emptyMessage}>
          You're all caught up. New notifications
          will appear here.
        </Text>
      </View>
    );
  };

  /* ==================== SCREEN ==================== */

  return (
    <View style={styles.container}>

      {/* ==================== HEADER ==================== */}

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Notifications",
          headerTitleAlign: "center",
          headerTintColor: "#000",

          /* Remove native bottom line/shadow */
          headerShadowVisible: false,

          /* Hide native back button */
          headerBackVisible: true,
        }}
      />

      {/* ==================== TOP BAR ==================== */}

      <View style={styles.topBar}>
        <View>
          <Text style={styles.notificationCount}>
            {unreadCount > 0
              ? `${unreadCount} unread`
              : "All notifications read"}
          </Text>
        </View>

        {unreadCount > 0 && (
          <Pressable
            onPress={markAllAsRead}
            style={styles.markAllButton}
          >
            <CheckCheck
              size={16}
              color="#2563EB"
            />

            <Text style={styles.markAllText}>
              Mark all read
            </Text>
          </Pressable>
        )}
      </View>

      {/* ==================== LIST ==================== */}

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          notifications.length === 0 &&
            styles.emptyListContent,
        ]}
      />
    </View>
  );
}

/* ==================== STYLES ==================== */

const styles = StyleSheet.create({
  /* ==================== CONTAINER ==================== */

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* ==================== TOP BAR ==================== */

  topBar: {
    minHeight: 52,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F4",
  },

  notificationCount: {
    fontSize: 12,
    color: "#7A8491",
    fontWeight: "500",
  },

  markAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },

  markAllText: {
    fontSize: 11,
    color: "#2563EB",
    fontWeight: "600",
  },

  /* ==================== LIST ==================== */

  listContent: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 25,
  },

  /* ==================== CARD ==================== */

  notificationCard: {
    minHeight: 92,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EBEF",
    borderRadius: 11,
    padding: 10,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  unreadCard: {
    backgroundColor: "#F8FBFF",
    borderColor: "#DCEBFA",
  },

  /* ==================== ICON ==================== */

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  /* ==================== CONTENT ==================== */

  contentContainer: {
    flex: 1,
    paddingRight: 6,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  title: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: "#263238",
    fontWeight: "600",
  },

  unreadTitle: {
    color: "#183B6B",
    fontWeight: "700",
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#2563EB",
    marginLeft: 6,
  },

  message: {
    fontSize: 10.5,
    lineHeight: 16,
    color: "#68727D",
    marginBottom: 4,
  },

  date: {
    fontSize: 9,
    color: "#9AA3AE",
  },

  /* ==================== ACTIONS ==================== */

  actionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    gap: 8,
  },

  deleteButton: {
    padding: 3,
  },

  /* ==================== EMPTY STATE ==================== */

  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "#F0EAFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#183B6B",
    marginBottom: 6,
  },

  emptyMessage: {
    fontSize: 11,
    lineHeight: 17,
    color: "#8A94A6",
    textAlign: "center",
  },
});