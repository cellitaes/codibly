import { Routes as AppRoutes, Route, BrowserRouter } from 'react-router-dom';

import MainPage from './Routes/MainPage';

const Routes = () => {
  return (
    <BrowserRouter basename={'/codibly/'}>
      <>
        <AppRoutes>
          <Route path="/" element={<MainPage />} />
        </AppRoutes>
      </>
    </BrowserRouter>
  );
};

export default Routes;
