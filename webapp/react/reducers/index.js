import {combineReducers} from 'redux';
import OpportunitiesReducer from './opportunitiesreducer';
import CompaniesReducer from './companiesreducer';


const rootReducer = combineReducers({
  opportunities: OpportunitiesReducer,
  companies: CompaniesReducer
});

export default rootReducer;
