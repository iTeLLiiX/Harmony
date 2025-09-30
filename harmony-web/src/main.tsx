import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Deutsche Lokalisierung
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { de } from 'date-fns/locale';

// Register German locale for date picker
registerLocale('de', de);
setDefaultLocale('de');

// React 18 Root API
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
