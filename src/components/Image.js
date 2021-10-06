import React from 'react';
import { Img } from 'react-image';
const Image = ({ src, ...props }) => {
  return <Img src={[src, '/placeholder.svg']} {...props} />;
};

export default Image;
