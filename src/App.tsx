import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import theme from './styles/globalStyles';

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    Oi
  </ChakraProvider>
);

export default App;
