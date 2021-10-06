import React from 'react';

const BasicLayout = ({ children }) => {
  return (
    <main className='App'>
      <div className='container'>{children}</div>
    </main>
  );
};

export default BasicLayout;
