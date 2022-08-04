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
      localStorage.setItem('user', JSON.stringify(response.data.token));
    } catch (err) {
      if (err instanceof AxiosError) {
        toast({
          position: 'top',
          title: 'Opps!',
          description: err.response?.data?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.log(err);
    }
  };

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(''));

    return () => {
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
      }
    };
  }, []);

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
