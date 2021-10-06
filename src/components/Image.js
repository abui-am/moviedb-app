import React from 'react';
import { Img } from 'react-image';
const Image = ({ src, ...props }) => {
  return (
    <Img
      src={[src, '/placeholder.svg']}
      loader={<img src={src} {...props} />}
      {...props}
    />
  );
};

export default Image;
