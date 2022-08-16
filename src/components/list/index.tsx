import React from 'react';
import {
  Grid,
  useToast,
  Heading,
  Tag,
  Button,
  Text,
  Flex,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { EditIcon } from '@chakra-ui/icons';
import { GridItemAnimation, MotionGridItem } from './animation';
import EditTask from '../editTask';
import api from '../../services/axios';
import Loading from '../loading';

interface ITask {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | undefined;
}

const ListTasks: React.FC = () => {
  const [data, setData] = React.useState<ITask[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const user = JSON.parse(String(sessionStorage.getItem('user')));

  const statusInPortuguese: { [key: string]: string } = {
    'in progress': 'em andamento',
    'to do': 'a fazer',
    done: 'feito',
  };

  const getAllTask = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks', { headers: { Authorization: `Bearer ${user.token}` } });
      setData(response.data);
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

  const convertDate = (date: Date) => {
    const newDate = new Date(date).toLocaleDateString('pt-BR');
    return newDate;
  };

  React.useEffect(() => {
    getAllTask();
  }, []);

  if (!data) return <Loading />;

  return (
    <Grid>
      <MotionGridItem
        variants={GridItemAnimation}
        bg="gray.100"
      >
        <Accordion allowMultiple>
          {
            data.map((task) => (
              <AccordionItem key={task._id}>
                <AccordionButton justifyContent="space-between">
                  <Heading as="h3" size="lg">{task.title}</Heading>
                  <Tag
                    fontWeight="bold"
                    size="md"
                    color="whiteAlpha.900"
                    variant="subtle"
                    bg={task.status}
                  >
                    { statusInPortuguese[task.status] }
                  </Tag>
                  <Tag
                    fontWeight="bold"
                    size="md"
                    color="whiteAlpha.900"
                    variant="subtle"
                    bg="blue.300"
                  >
                    { convertDate(task.createdAt) }
                  </Tag>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>{ task.description}</Text>
                    <Button
                      bg="transparent"
                      _hover={{ backgroundColor: 'transparent' }}
                      rightIcon={<EditIcon />}
                      onClick={onOpen}
                    />
                  </Flex>
                </AccordionPanel>
                <EditTask
                  isOpen={isOpen}
                  onClose={onClose}
                  initialRef={initialRef}
                  finalRef={finalRef}
                  setLoading={setLoading}
                  loading={loading}
                  task={task}
                  getAllTask={getAllTask}
                />
              </AccordionItem>
            ))
          }
        </Accordion>
      </MotionGridItem>
    </Grid>
  );
};

export default ListTasks;
