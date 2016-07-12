import {combineReducers} from 'redux';
import CompanyReducer from './companyreducer';
import SearchResultsReducer from './searchresultsreducer';
import OpportunitiesReducer from './opportunitiesreducer';
import SearchTermReducer from './searchtermreducer';


const rootReducer = combineReducers({
  searchTerm: SearchTermReducer,
  searchResults: SearchResultsReducer,
  company: CompanyReducer,
  opportunities: OpportunitiesReducer
});

export default rootReducer;
