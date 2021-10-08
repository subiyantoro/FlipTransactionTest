import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const BadgeSuccess = () => {
  return (
    <View style={styleBadge.view}>
      <Text style={styleBadge.text}>Berhasil</Text>
    </View>
  )
}

const styleBadge = StyleSheet.create({
  view: {
    padding: 5,
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#55B783",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center"
  }
})
