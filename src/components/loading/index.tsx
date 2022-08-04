import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const Loading: React.FC = () => (
  <Center height="100vh">
    <Spinner size="lg" />
  </Center>
);

export default Loading;
