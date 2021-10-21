import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, View, Image, Text, TouchableOpacity, Keyboard } from "react-native";
import { Dialog, Portal, RadioButton } from "react-native-paper";
import { NEWEST_DATE, NO_SORT, OLDEST_DATE, SORT_BY_NAME_AZ, SORT_BY_NAME_ZA } from "../../configs/utils";
import {
  getListTransaction, restoreListTransaction,
  searchByKeyword,
  sortTransaction,
  sortTransactionWithSearch,
} from "../../actions/transactions";
import { connect } from "react-redux";

const SearchBox = (props) => {
  const {
    sortList,
    mainList,
    searchList,
    transactions,
    getListTransaction,
    restoreListTransaction,
    doSortWithSearch,
    dataList,
    doSearch,
    doSort
  } = props
  const [searchText, setSearchText] = useState("")
  const [visibleSort, setVisibleSort] = useState(false)
  const [sortMode, setSortMode] = useState(NO_SORT)
  return (
    <View style={{flexDirection: "row", backgroundColor: '#fff'}}>
      <TextInput
        inlineImageLeft="search"
        underlineColorAndroid='transparent'
        inlineImagePadding={15}
        placeholder="Cari nama, bank, atau nominal"
        style={styleInput.inputSearch}
        onChangeText={search => {
          setSearchText(search)
          if(search === "" || search == null) {
            restoreListTransaction(mainList)
          }
          doSearch(search, transactions)
        }}
        onPressOut={() => {
          Keyboard.dismiss
        }}
      />
      <TouchableOpacity onPress={() => setVisibleSort(true)}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10
        }}>
          <Text style={{paddingHorizontal: 5, color: "#E7765E"}}>URUTKAN</Text>
          <Image source={require("../../../assets/arrow-down.png")} />
        </View>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visibleSort} onDismiss={() => setVisibleSort(false)}>
          <Dialog.Content>
            <RadioButton.Group onValueChange={(mode) => {
              setSortMode(mode)
              let dataTransaction = searchText === "" || searchText == null ? transactions : dataList
              let arrayTransaction
              if (mode === SORT_BY_NAME_AZ) {
                arrayTransaction = dataTransaction.sort((a, b) => (a["beneficiary_name"] > b["beneficiary_name"]) ? 1 : ((b["beneficiary_name"] > a["beneficiary_name"]) ? -1 : 0))
              } else if (mode === SORT_BY_NAME_ZA) {
                arrayTransaction = dataTransaction.sort((a, b) => (a["beneficiary_name"] < b["beneficiary_name"]) ? 1 : ((b["beneficiary_name"] < a["beneficiary_name"]) ? -1 : 0))
              } else if (mode === NEWEST_DATE) {
                arrayTransaction = dataTransaction.sort((a, b) => (a["completed_at"] > b["completed_at"]) ? 1 : ((b["completed_at"] > a["completed_at"]) ? -1 : 0))
              } else if (mode === OLDEST_DATE) {
                arrayTransaction = dataTransaction.sort((a, b) => (a["completed_at"] < b["completed_at"]) ? 1 : ((b["completed_at"] < a["completed_at"]) ? -1 : 0))
              } else if (mode === NO_SORT) {
                arrayTransaction = mainList
              }
              doSort(arrayTransaction)
              setVisibleSort(false)
            }} value={sortMode}>
              <View style={styleInput.viewOption}>
                <RadioButton.Item value={NO_SORT} color="#E7765E" label="URUTKAN" position="leading"/>
              </View>
              <View style={styleInput.viewOption}>
                <RadioButton.Item value={SORT_BY_NAME_AZ} color="#E7765E" label="Nama A-Z" position="leading" />
              </View>
              <View style={styleInput.viewOption}>
                <RadioButton.Item value={SORT_BY_NAME_ZA} color="#E7765E" label="Nama Z-A" position="leading" />
              </View>
              <View style={styleInput.viewOption}>
                <RadioButton.Item value={NEWEST_DATE} color="#E7765E" label="Tanggal Terbaru" position="leading" />
              </View>
              <View style={styleInput.viewOption}>
                <RadioButton.Item value={OLDEST_DATE} color="#E7765E" label="Tanggal Terlama" position="leading" />
              </View>
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  )
}

const styleInput = StyleSheet.create({
  inputSearch: {
    padding: 10,
    borderRadius: 20,
    flex: 2
  },
  textSort: {
    color: "black",
  },
  viewOption: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 0
  }
})

function mapStateToProps(state){
  return {
    dataList: state.transactionStore.dataList,
    searchList: state.transactionStore.searchList,
    mainList: state.transactionStore.saveMainList,
    sortList: state.transactionStore.sortList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doSearch: (keyword, list) => dispatch(searchByKeyword(keyword, list)),
    doSort: (list) => dispatch(sortTransaction(list)),
    doSortWithSearch: (list) => dispatch(sortTransactionWithSearch(list)),
    getListTransaction: () => dispatch(getListTransaction()),
    restoreListTransaction: (list) => dispatch(restoreListTransaction(list))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
