import transactions from './transactions';
import {combineReducers} from 'redux';

// eslint-disable-next-line no-unused-vars
const reducers = {
  transactionStore: transactions,
};

const rootReducers = combineReducers(reducers);
export default rootReducers;
