import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { router } from './routes/router';
import store from './state/store';
import { appTheme } from './theme';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import GlobalSpinner from "./components/GlobalSpinner/GlobalSpinner";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let persistor = persistStore(store);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<GlobalSpinner />} persistor={persistor}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>

  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
