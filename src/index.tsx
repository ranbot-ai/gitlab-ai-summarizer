/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { FormProvider } from './contexts/FormContext';

import './assets/styles/settings.css';
import AppIndex from './containers/app/AppIndex';
import { getThemeColor } from './utils';

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container);
  const themeColor = await getThemeColor();
  container.style.backgroundColor = `${themeColor}`;

  root.render(
    <React.StrictMode>
      <FormProvider>
        <AppIndex />
      </FormProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
