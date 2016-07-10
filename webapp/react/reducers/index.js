import {combineReducers} from 'redux';
import CompanyReducer from './companyreducer';
import SuggestionsReducer from './suggestionsreducer';
import OpportunitiesReducer from './opportunitiesreducer';


const rootReducer = combineReducers({
  company: CompanyReducer,
  suggestions: SuggestionsReducer,
  opportunities: OpportunitiesReducer
});

export default rootReducer;
