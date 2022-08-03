import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <App />,
);
