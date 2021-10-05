import { createStore } from 'redux';

import rootReducer from './reducer/root';

const store = createStore(rootReducer);

export default store;
