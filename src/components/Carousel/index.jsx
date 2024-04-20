import React from 'react';
import Carousel from 'react-material-ui-carousel';
import CR_1 from '../../assets/cr1.jpg';
import CR_2 from '../../assets/cr2.jpg';
import CR_3 from '../../assets/cr3.jpg';
import CR_4 from '../../assets/cr4.webp';
import { Paper } from '@mui/material';

var items = [
  {
    src: CR_1,
  },
  {
    src: CR_2,
  },
  {
    src: CR_3,
  },
  {
    src: CR_4,
  },
];

function Item(props) {
  return (
    <Paper
      style={{
        backgroundColor: 'transparent',
        height: 300,
        overflow: 'hidden',
      }}
    >
      <img src={props.item.src} alt="" style={{ width: 1200 }} />
    </Paper>
  );
}

export default function CaraouselSlider(props) {
  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
