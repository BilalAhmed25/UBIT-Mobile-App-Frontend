import { StyleSheet, Text } from "react-native";

export default function PaymentSummaryFooter() {
  return (
    <Text style={styles.text}>
      By continuing you agree to the payment terms & conditions
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 11,
    color: "#aaa",
    marginTop: -4,
  },
});