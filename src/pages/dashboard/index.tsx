import React from 'react';
import {
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import ListTasks from '../../components/list';
import NewTask from '../../components/newTask';

const Dashboard: React.FC = () => (
  <Grid
    alignItems="center"
  >
    <GridItem
      bg="whiteAlpha.900"
      mb={10}
    >
      <Image
        src="title.svg"
        alt="daily schedule"
      />
    </GridItem>
    <GridItem>
      <NewTask />
    </GridItem>
    <GridItem>
      <ListTasks />
    </GridItem>
  </Grid>
);

export default Dashboard;
