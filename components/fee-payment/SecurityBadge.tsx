import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function SecurityBadge() {
  return (
    <View style={styles.badge}>
      <MaterialIcons name="lock" size={16} color="#800000" />
      <Text style={styles.text}>
        Your payment is secured with 256-bit SSL encryption
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff8f8",
    borderWidth: 1,
    borderColor: "#f0d0d0",
    borderRadius: 12,
    padding: 12,
  },
  text: {
    fontSize: 12,
    color: "#800000",
    flex: 1,
  },
});