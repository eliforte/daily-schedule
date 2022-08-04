import {
  Grid,
  GridItem,
  GridProps,
  GridItemProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const gridAnimation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const gridItemAnimation = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const MotionGridItem = motion<GridItemProps>(GridItem);

export const MotionGrid = motion<GridProps>(Grid);
