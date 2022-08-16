import { GridItem, GridItemProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const GridItemAnimation = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

export const MotionGridItem = motion<GridItemProps>(GridItem);
