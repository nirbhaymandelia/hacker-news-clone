import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    // enhancers: [monitorReducersEnhancer]
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }

  return store;
}

// const store = configureStore({
//   reducer: rootReducer,
// });

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     // eslint-disable-next-line global-require
//     const newRootReducer = require('./rootReducer').default;
//     store.replaceReducer(newRootReducer);
//   });
// }

// export default store;
