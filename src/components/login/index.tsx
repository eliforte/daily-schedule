import React from 'react';
import {
  InputGroup,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';
import api from '../../services/axios';

const Login: React.FC = () => {
  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { ...loginInfo });
      localStorage.setItem('user', JSON.stringify(response.data.token));
    } catch (err) {
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
          w={['500px']}
        >
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
          />
          <Input
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
