import { GET_LIST_TRANSACTION, LOADING, SEARCH_WORD } from "./types";
import {
  BASE_URL,
  MONTH_NAME,
  RESTORE_LIST, SORT_TRANSACTION, SORT_TRANSACTION_WITH_SEARCH,
} from "../configs/utils";
import transactions from "../reducers/transactions";

export const getListTransaction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    })
    try {
      fetch(BASE_URL, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(json => {
          let arrayData = [];
          Object.keys(json).map((key, index) => {
            const dateTransaction = new Date(json[key].completed_at.substring(0, json[key].completed_at.indexOf(" ")))
            const reformatDate = dateTransaction.getDate() + ' ' + MONTH_NAME[dateTransaction.getMonth()] + ' ' + dateTransaction.getFullYear()
            const reFormat = {
              account_number: json[key].account_number,
              amount: 'Rp' + json[key].amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
              beneficiary_bank: json[key].beneficiary_bank.toUpperCase(),
              beneficiary_name: json[key].beneficiary_name,
              completed_at: reformatDate,
              fee: json[key].fee,
              id: json[key].id,
              remark: json[key].remark,
              sender_bank: json[key].sender_bank.toUpperCase(),
              status: json[key].status,
              unique_code: json[key].unique_code
            }
            arrayData.push(reFormat)
          })
          dispatch({
            type: GET_LIST_TRANSACTION,
            payload: arrayData
          })
        })
        .catch((error) => console.log(error))
    } catch (e) {
      console.log(e)
    }
  }
}

function searchValue(keyword, transactions: Array) {
  let keywordSearch = new RegExp(keyword + '.*', 'i')
  let dataSearch = []
  for (let i = 0; i < transactions.length; i++) {
    if (
      !!transactions[i].beneficiary_name.match(keywordSearch) ||
      !!transactions[i].amount.match(keywordSearch) ||
      !!transactions[i].beneficiary_bank.match(keywordSearch) ||
      !!transactions[i].sender_bank.match(keywordSearch)
    ) {
      dataSearch.push(transactions[i])
    }
  }
  return dataSearch
}

export const searchByKeyword = (keyword, transactions) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_WORD,
      payload: searchValue(keyword, transactions)
    })
  }
}

export const sortTransaction = (transactions: Array) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    })
    dispatch({
      type: SORT_TRANSACTION,
      payload: transactions
    })
  }
}

export const sortTransactionWithSearch = (transactions: Array) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    })
    dispatch({
      type: SORT_TRANSACTION_WITH_SEARCH,
      payload: transactions
    })
  }
}

export const restoreListTransaction = (list) => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING
    })
    dispatch({
      type: RESTORE_LIST,
      payload: getState().transactionStore.saveMainList
    })
  }
}
