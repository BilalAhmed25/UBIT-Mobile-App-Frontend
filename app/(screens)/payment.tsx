import FeeBreakdownCard from "@/components/fee-payment/FeeBreakdownCard";
import Header from "@/components/fee-payment/Header";
import PaymentSummaryFooter from "@/components/fee-payment/PaymentSummaryFooter";
import SecurityBadge from "@/components/fee-payment/SecurityBadge";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import CardPaymentForm from "../../components/fee-payment/CardPaymentForm";
import ConfirmPaymentButton from "../../components/fee-payment/ConfirmPaymentButton";
import PaymentAmountCard from "../../components/fee-payment/PaymentAmountCard";
import PaymentMethodSelector from "../../components/fee-payment/PaymentMethodSelector";

type Method = "card" | "bank" | "wallet";

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<Method>("card");

  const fees = params.fees ? JSON.parse(params.fees as string) : [];
  const total = params.total ? Number(params.total) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Make Payment" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PaymentAmountCard amount={total} />
        <FeeBreakdownCard items={fees} total={total} />
        <PaymentMethodSelector
          selected={selectedMethod}
          onSelect={setSelectedMethod}
        />
        {selectedMethod === "card" && <CardPaymentForm />}
        <SecurityBadge />
        <ConfirmPaymentButton
          amount={total}
          onPress={() => router.push("/payment-success")}
        />
        <PaymentSummaryFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 14,
  },
});