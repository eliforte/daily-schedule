import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import theme from './styles/globalStyles';

const App: React.FC = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);

export default App;
