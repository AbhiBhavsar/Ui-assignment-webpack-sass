import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import modelReducer from './modelReducer';
import modalReducer from './modalReducer';
import { FormReducer } from './formReducer';

const rootReducer = combineReducers({
    loading: loadingReducer,
    models: modelReducer,
    form: FormReducer,
    modal: modalReducer
});

export default rootReducer;
