import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  Button,
  RadioGroup,
  Radio,
  useToast,
  Spinner,
  Text,
  Stack,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import api from '../../services/axios';

interface ITask {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | undefined;
}

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.MutableRefObject<null>;
  finalRef: React.MutableRefObject<null>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  task: ITask;
  getAllTask: () => void;
}

const EditTask: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  setLoading,
  task,
  loading,
  getAllTask,
}) => {
  const [editedTask, setEditedTask] = React.useState({
    title: '',
    description: '',
  });
  const [status, setStatus] = React.useState('to do');
  const user = JSON.parse(String(sessionStorage.getItem('user')));
  const toast = useToast();

  const bodyForEdit = {
    title: editedTask.title ? editedTask.title : task.title,
    description: editedTask.description ? editedTask.description : task.description,
    status,
  };

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const putTask = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/tasks/${task._id}`, { ...bodyForEdit }, requestConfig);
      setLoading(false);
      getAllTask();
      onClose();
      return toast({
        position: 'top',
        title: 'Tarefa editada com sucesso!',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
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
        description: 'Ocorreu um erro ao editar a tarefa. Tente novamente.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={(e) => putTask(e)}>
            <Stack spacing={4}>
              <FormLabel>Título</FormLabel>
              <Input
                type="text"
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                ref={initialRef}
                placeholder="adicione título"
                value={editedTask.title}
              />
              <FormLabel>Descrição</FormLabel>
              <Input
                type="text"
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                value={editedTask.description}
                placeholder="adicione uma descrição"
              />
              <FormLabel>Status</FormLabel>
              <RadioGroup
                onChange={setStatus}
                value={status}
                flexDirection="row"
              >
                <Radio mr={3} colorScheme="cyan" value="to do">A fazer</Radio>
                <Radio mr={3} colorScheme="yellow" value="in progress">Em progresso</Radio>
                <Radio mr={3} colorScheme="green" value="done">Concluído</Radio>
              </RadioGroup>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
              >
                {
                  loading
                    ? (
                      <Text>
                        Editando...
                        <Spinner
                          size="sm"
                          emptyColor="blue.500"
                          color="gray.200"
                        />
                      </Text>
                    )
                    : 'Salvar'
                }
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditTask;
