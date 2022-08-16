import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import theme from './styles/globalStyles';

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
