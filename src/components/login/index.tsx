import React from 'react';
import { AxiosError } from 'axios';
import {
  InputGroup,
  Input,
  Button,
  Center,
  useToast,
} from '@chakra-ui/react';
import api from '../../services/axios';

const Login: React.FC = () => {
  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: '',
  });

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { ...loginInfo });
      sessionStorage.setItem('user', JSON.stringify(response.data));
    } catch (err) {
      if (err instanceof AxiosError) {
        return toast({
          position: 'top',
          title: 'Ops!',
          description: err.response?.data?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      toast({
        position: 'top',
        title: 'Ops!',
        description: 'Algo deu errado, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  return (
    <Center p={5}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputGroup
          gap={5}
          flexDirection="column"
          alignItems="center"
          w={['100%', '500px']}
        >
          <Input
            bg="gray.100"
            placeholder="Email"
            type="email"
            onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
          />
          <Input
            bg="gray.100"
            placeholder="Senha"
            type="password"
            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
          />
          <Button border="1px solid #2B6CB0" color="#2B6CB0" type="submit">Entrar</Button>
        </InputGroup>
      </form>
    </Center>
  );
};

export default Login;
