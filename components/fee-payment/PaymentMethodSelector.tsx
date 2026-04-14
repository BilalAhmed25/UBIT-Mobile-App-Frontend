import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Method = "card" | "bank" | "wallet";

const METHOD_LABELS: Record<Method, string> = {
  card: "Card",
  bank: "Easypaisa",
  wallet: "JazzCash",
};

export default function PaymentMethodSelector({
  selected,
  onSelect,
}: {
  selected: Method;
  onSelect: (method: Method) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>
      <View style={styles.row}>
        {(Object.keys(METHOD_LABELS) as Method[]).map((method) => {
          const active = selected === method;
          return (
            <TouchableOpacity
              key={method}
              onPress={() => onSelect(method)}
              style={[styles.card, active && styles.active]}
            >
              <Text style={[styles.text, active && styles.activeText]}>
                {METHOD_LABELS[method]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  active: {
    backgroundColor: "#B40000",
  },
  text: {
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
});