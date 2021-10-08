import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BadgeSuccess } from "./BadgeSuccess";
import { BadgePending } from "./BadgePending";

const TransactionItem = (props) => {
  const {
    data
  } = props
  useEffect(() => {
    // console.log(data)
  },[])
  return (
    <View style={[styleItem.viewItem,{borderLeftColor: data.status === "SUCCESS" ? "#55B783" : "#ED8868",}]}>
      <View style={{flex: 2}}>
        <Text style={styleItem.textBank}>{data.sender_bank.toUpperCase()} &#10140; {data.beneficiary_bank.toUpperCase()}</Text>
        <Text style={styleItem.textReceiver}>{data.beneficiary_name}</Text>
        <Text style={styleItem.textReceiver}>
          {data.amount}
          <Text style={{fontSize: 15, color: "black", fontWeight: "bold"}}> &#8226; </Text>
          {data.completed_at}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
        {
          data.status === "SUCCESS" ? <BadgeSuccess /> : <BadgePending />
        }
      </View>
    </View>
  )
}

const styleItem = StyleSheet.create({
  viewItem: {
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 10,
    borderLeftWidth: 8,
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    justifyContent: "space-between"
  },
  textBank: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: "1%"
  },
  textReceiver: {
    color: "black",
    fontSize: 16,
    marginVertical: "1%"
  }
})

export default TransactionItem
