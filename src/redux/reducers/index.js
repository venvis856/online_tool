import { combineReducers } from 'redux';
import jsonReducer from './jsonReducer';

// 通过combineReducers把多个reducer进行合并
const index = combineReducers({
    jsonReducer: jsonReducer,
})

export default index;
