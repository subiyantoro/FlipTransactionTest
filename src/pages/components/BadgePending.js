import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const BadgePending = () => {
  return (
    <View style={styleBadge.view}>
      <Text style={styleBadge.text}>Pengecekan</Text>
    </View>
  )
}

const styleBadge = StyleSheet.create({
  view: {
    padding: 5,
    width: "80%",
    borderRadius: 5,
    justifyContent: "center",
    borderColor: "#ED8868",
    borderWidth: 1
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 12
  }
})
