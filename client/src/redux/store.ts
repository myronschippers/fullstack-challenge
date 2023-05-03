// import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './reducers/_root.reducer';
// import rootSaga from './sagas/_root.saga';

// const sagaMiddleware = createSagaMiddleware();
// const middlewareList = process.env.NODE_ENV === 'development' ?
//   [sagaMiddleware, logger] :
//   [sagaMiddleware];

// const store = createStore(
//     // tells the saga middleware to use the rootReducer
//     // rootSaga contains all of our other reducers
//     rootReducer,
//     // adds all middleware to our project including saga and logger
//     applyMiddleware(...middlewareList),
// );

// // tells the saga middleware to use the rootSaga
// // rootSaga contains all of our other sagas
// sagaMiddleware.run(rootSaga);

// export default store;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './reducers/_root.reducer';

export const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
