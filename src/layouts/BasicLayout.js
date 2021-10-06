import React from 'react';

const BasicLayout = ({ children }) => {
  return (
    <div style={{ position: 'relative' }}>
      <nav className='nav d-flex center'>
        <div className='container'>
          <h5>MovieDB</h5>
        </div>
      </nav>
      <main className='App'>
        <div className='container'>{children}</div>
      </main>
    </div>
  );
};

export default BasicLayout;
