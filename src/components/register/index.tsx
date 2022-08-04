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

const Register: React.FC = () => {
  const [register, setRegisterInfo] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', { ...register });
      sessionStorage.setItem('user', JSON.stringify(response.data.token));
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
            placeholder="Nome"
            bg="gray.100"
            type="text"
            onChange={(e) => setRegisterInfo({ ...register, name: e.target.value })}
          />
          <Input
            bg="gray.100"
            placeholder="Email"
            type="email"
            onChange={(e) => setRegisterInfo({ ...register, email: e.target.value })}
          />
          <Input
            bg="gray.100"
            placeholder="Senha"
            type="password"
            onChange={(e) => setRegisterInfo({ ...register, password: e.target.value })}
          />
          <Button border="1px solid #2B6CB0" color="#2B6CB0" type="submit">Registrar-se</Button>
        </InputGroup>
      </form>
    </Center>
  );
};

export default Register;
