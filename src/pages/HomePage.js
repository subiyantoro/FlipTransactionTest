import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, ListView, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import SearchBox from "./components/SearchBox";
import { Provider } from "react-native-paper";
import TransactionItem from "./components/TransactionItem";
import { connect } from "react-redux";
import { getListTransaction } from "../actions/transactions";
import { useNavigation } from "@react-navigation/native";

const HomePage = (props) => {
  const navigation = useNavigation()
  const {
    isError,
    sortList,
    isLoading,
    isSearch,
    searchList,
    mainList,
    transactionList,
    dispatchGetTransaction
  } = props
  useEffect(() => {
    dispatchGetTransaction()
  },[])

  return (
    <Provider>
      <SafeAreaView>
        <View style={{backgroundColor: "#F5F9F8", margin: 10}}>
          <SearchBox transactions={mainList} />
        </View>
        {
          isLoading ? <ActivityIndicator /> :
            isSearch && transactionList.length === 0 ?
              <View style={{flexDirection: "row", justifyContent: "center"}}>
                <Text style={{alignItems: "center", justifyContent: "center"}}>No Transaction Found</Text>
              </View> :
              <FlatList data={transactionList} extraData={transactionList} renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('Detail', {item: item})}>
                  <TransactionItem data={item} />
                </TouchableOpacity>
              )} />
        }
      </SafeAreaView>
    </Provider>
  )
}

function mapStateToProps(state) {
  return {
    transactionList: state.transactionStore.dataList,
    searchList: state.transactionStore.searchList,
    isLoading: state.transactionStore.isLoading,
    mainList: state.transactionStore.saveMainList,
    sortList: state.transactionStore.sortList,
    isSearch: state.transactionStore.isSearch,
    isError: state.transactionStore.isError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetTransaction: () => dispatch(getListTransaction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
