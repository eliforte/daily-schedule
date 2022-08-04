import React from 'react';
import Lottie from 'react-lottie';
import {
  // Grid,
  // GridItem,
  Text,
  Button,
  Center,
  Image,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  MotionGrid,
  gridAnimation,
  MotionGridItem,
  gridItemAnimation,
} from '../../styles/animation';
import Login from '../../components/login';
import Register from '../../components/register';
// import Loading from '../../components/loading';
import animationData from '../../assets/31000-multitasking.json';

const Home: React.FC = () => {
  const Navigate = useNavigate();
  const isLoggedIn = JSON.parse(String(sessionStorage.getItem('user')));
  const [loginOrRegister, setLoginOrRegister] = React.useState('login');
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (isLoggedIn?.token) {
    Navigate('/dashboard');
  }

  return (
    <MotionGrid
      templateColumns={['1fr', '1fr', '1fr', '1fr', '1fr 1fr']}
      height="100vh"
      alignItems="center"
      justifyItems="center"
      maxWidth="100%"
      variants={gridAnimation}
      initial="hidden"
      animate="visible"
    >
      <MotionGridItem
        variants={gridItemAnimation}
        display={['none', 'none', 'none', 'block']}
      >
        <Lottie
          isClickToPauseDisabled
          options={defaultOptions}
        />
      </MotionGridItem>
      <MotionGridItem
        variants={gridItemAnimation}
        backgroundColor="white"
        p={5}
        alignItems="center"
        gap={5}
        borderRadius="5px"
        boxShadow="0px 0px 20px -4px #000000"
        mb="0.5rem"
      >
        <Image src="title.svg" alt="daily schedule" />
        <Flex
          display={['block', 'block', 'block', 'none']}
          w="100%"
          alignItems="center"
        >
          <Lottie
            isClickToPauseDisabled
            options={defaultOptions}
          />
        </Flex>
        {
          loginOrRegister === 'login' ? <Login /> : <Register />
        }
        {
          loginOrRegister === 'login' ? (
            <Center mt="1em">
              <Text color="gray.600">
                Não tem conta?
                <Button
                  color="blue.600"
                  ml={1}
                  background="transparent"
                  onClick={() => setLoginOrRegister('register')}
                >
                  Registre-se
                </Button>
              </Text>
            </Center>
          ) : (
            <Center mt="1em">
              <Text color="gray.600">
                Já tem uma conta?
                <Button
                  color="blue.600"
                  ml={1}
                  background="transparent"
                  onClick={() => setLoginOrRegister('login')}
                >
                  Faça login
                </Button>
              </Text>
            </Center>
          )
        }
      </MotionGridItem>
    </MotionGrid>
  );
};

export default Home;
