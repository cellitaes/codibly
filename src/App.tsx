import { Provider } from 'react-redux';
import Routes from './Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
