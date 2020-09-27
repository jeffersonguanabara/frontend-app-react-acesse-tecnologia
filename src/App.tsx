import React from 'react';

import Routes from './routes';

import './assets/styles/global.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
