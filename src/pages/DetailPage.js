import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Clipboard } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const DetailPage = (props) => {
  const route = useRoute()
  const navigate = useNavigation()
  const item = route.params.item

  return (
    <View style={styleDetail.view}>
      <View style={[styleDetail.childView,{justifyContent: "flex-start"}]}>
        <Text style={styleDetail.textHeader}>ID TRANSAKSI:#{item.id}</Text>
        <TouchableOpacity onPress={() => Clipboard.getString()}>
          <Image source={require("../../assets/copy.png")} />
        </TouchableOpacity>
      </View>
      <View style={[styleDetail.childView, {justifyContent: "space-between"}]}>
        <Text style={styleDetail.textHeader}>
          DETAIL TRANSAKSI
        </Text>
        <TouchableOpacity onPress={() => {navigate.goBack()}}>
          <Text style={styleDetail.textTutup}>
            Tutup
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styleDetail.bodyView}>
        <View>
          <Text style={styleDetail.itemBodyView}>{item.sender_bank} &#10140; {item.beneficiary_bank}</Text>
        </View>
        <View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={[styleDetail.itemBodyView, {flex: 1.5}]}>
              <Text style={[styleDetail.subItemBody, {marginTop: 15}]}>{item.beneficiary_name.toUpperCase()}</Text>
              <Text style={[styleDetail.subItemBody, {fontWeight: "600"}]}>{item.account_number}</Text>
            </View>
            <View style={{alignItems: "flex-start", flex: 1}}>
              <Text style={[styleDetail.subItemBody, {marginTop: 15}]}>NOMINAL</Text>
              <Text style={[styleDetail.subItemBody, {fontWeight: "600"}]}>{item.amount}</Text>
            </View>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 15}}>
            <View style={[styleDetail.itemBodyView, {flex: 1.5}]}>
              <Text style={[styleDetail.subItemBody, {marginTop: 15}]}>BERITA TRANSFER</Text>
              <Text style={[styleDetail.subItemBody, {fontWeight: "600"}]}>{item.remark}</Text>
            </View>
            <View style={{alignItems: "flex-start", flex: 1}}>
              <Text style={[styleDetail.subItemBody, {marginTop: 15}]}>KODE UNIK</Text>
              <Text style={[styleDetail.subItemBody, {fontWeight: "600"}]}>{item.unique_code}</Text>
            </View>
          </View>
          <View style={[styleDetail.itemBodyView, {marginBottom: 15}]}>
            <Text style={styleDetail.subItemBody}>WAKTU DIBUAT</Text>
            <Text style={[styleDetail.subItemBody, {fontWeight: "600"}]}>{item.completed_at}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styleDetail = StyleSheet.create({
  view: {
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  bodyView: {
    backgroundColor: "#fff",
    marginVertical: 10,
    flexDirection: "column",
    paddingHorizontal: '4%',
  },
  itemBodyView: {
    color: "black",
    fontWeight: "700"
  },
  subItemBody: {
    color: "black",
    fontWeight: "700"
  },
  childView: {
    borderBottomWidth: 1,
    borderColor: '#D0D0D0',
    flexDirection: "row",
    alignItems: "center",
    width: '100%'
  },
  textHeader: {
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    color: "black",
    fontWeight: "700",
  },
  textTutup: {
    paddingHorizontal: 15,
    color: "#ED8868"
  }
})

export default DetailPage
