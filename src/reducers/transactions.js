import { GET_LIST_TRANSACTION, IS_ERROR, LOADING, SEARCH_WORD } from "../actions/types";
import {
  RESTORE_LIST,
  SORT_TRANSACTION,
  SORT_TRANSACTION_WITH_SEARCH,
} from "../configs/utils";

const initState = {
  dataList: [],
  searchList: [],
  saveMainList: [],
  isLoading: false,
  isError: false,
  isSearch: false
}

export default (state = initState, action = {}) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_LIST_TRANSACTION: {
      return {
        ...state,
        dataList: action.payload,
        saveMainList: action.payload,
        isLoading: false
      }
    }
    case SEARCH_WORD: {
      return {
        ...state,
        dataList: action.payload,
        isSearch: !(action.payload == null || action.payload === "")
      }
    }
    case IS_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    }
    case SORT_TRANSACTION: {
      return {
        ...state,
        dataList: action.payload,
        isLoading: false
      }
    }
    case SORT_TRANSACTION_WITH_SEARCH: {
      return {
        ...state,
        searchList: action.payload,
        isLoading: false
      }
    }
    case RESTORE_LIST: {
      return {
        ...state,
        dataList: action.payload,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}
