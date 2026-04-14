import { StyleSheet, Text, View } from "react-native";

type Item = { label: string; amount: number };

export default function FeeBreakdownCard({ items, total }: { items: Item[]; total: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Fee Breakdown</Text>
      {items.map((item, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>PKR {item.amount.toLocaleString()}</Text>
        </View>
      ))}
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>PKR {total.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  heading: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 10,
    fontFamily: "Poppins-SemiBold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  label: { fontSize: 13, color: "#666" },
  value: { fontSize: 13, color: "#666" },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginVertical: 8 },
  totalLabel: { fontSize: 14, fontWeight: "700", color: "#1a1a1a", fontFamily: "Poppins-SemiBold" },
  totalValue: { fontSize: 14, fontWeight: "700", color: "#800000", fontFamily: "Poppins-SemiBold" },
});