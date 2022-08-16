import React from 'react';
import { AxiosError } from 'axios';
import {
  InputGroup,
  Input,
  Button,
  InputLeftElement,
  Text,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import api from '../../services/axios';

const CreateTask: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState('');
  const toast = useToast();

  const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const token = JSON.parse(String(sessionStorage.getItem('user')));
      await api.post('/tasks', { task }, { headers: { Authorization: `Bearer ${token}` } });
      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setLoading(false);
        return toast({
          position: 'top',
          title: 'Ops!',
          description: err.response?.data?.message,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
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
    <form onSubmit={(e) => createTask(e)}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<ArrowForwardIcon color="gray.400" />}
        />
        <Input
          placeholder="Nova tarefa"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          justifyContent="center"
        />
        <Button
          type="submit"
          variant="solid"
        >
          {
            loading
              ? (
                <Text>
                  Adicionando...
                  <Spinner
                    size="sm"
                    emptyColor="gray.200"
                    color="blue.500"
                  />
                </Text>
              )
              : 'Adicionar'
          }
        </Button>
      </InputGroup>
    </form>
  );
};

export default CreateTask;
