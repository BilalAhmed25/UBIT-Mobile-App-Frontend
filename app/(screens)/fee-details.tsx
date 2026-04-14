import Header from "@/components/fee-payment/Header";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import FeeItemCard from "../../components/fee-payment/FeeItemCard";
import FeeSummaryCard from "../../components/fee-payment/FeeSummaryCard";
import PayNowButton2 from "../../components/fee-payment/PayNowButton2";
export default function FeeDetailsScreen(){

const router = useRouter();

const fees = [
{ title: "Tuition Fee", amount: 40000 },
{ title: "Lab Fee", amount: 5000 },
{ title: "Library Fee", amount: 2000 },
{ title: "Transport Fee", amount: 8000 },
{ title: "Miscellaneous", amount: 5000 },
];

const total = fees.reduce((sum, f) => sum + f.amount, 0);

return(

<SafeAreaView style={styles.container}>

<ScrollView>
<Header title="Fee Details" />
<View style={styles.list}>

{fees.map((fee,index)=>(
<FeeItemCard
key={index}
title={fee.title}
amount={fee.amount}
/>
))}

</View>

<FeeSummaryCard total={total} />


        <PayNowButton2
  onPress={() =>
    router.push({
      pathname: "/payment",
      params: {
        fees: JSON.stringify(fees),
        total: total,
      },
    })
  }
/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:"#F3F3F3"
},

list:{
marginTop:20
}
});
