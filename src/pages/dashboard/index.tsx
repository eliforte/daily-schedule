import React from 'react';
import {
  Grid,
  GridItem,
} from '@chakra-ui/react';
import ListTasks from '../../components/list';
import NewTask from '../../components/newTask';

const Dashboard: React.FC = () => (
  <Grid>
    <GridItem>
      <NewTask />
    </GridItem>
    <GridItem>
      <ListTasks />
    </GridItem>
  </Grid>
);

export default Dashboard;
