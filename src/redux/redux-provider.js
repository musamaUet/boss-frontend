import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
//
import { LoadingScreen } from 'src/components/loading-screen';
import { initialize } from './slices/auth';
import { store, persistor, useDispatch, useSelector } from './store';

// ----------------------------------------------------------------------

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Wrap>{children}</Wrap>
      </PersistGate>
    </Provider>
  );
}

ReduxProvider.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

export function Wrap({ children }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  return loading ? <LoadingScreen sx={{ position: 'fixed', top: 0, left: 0 }} /> : <>{children}</>;
}

Wrap.propTypes = {
  children: PropTypes.node,
};
