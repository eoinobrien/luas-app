import React from 'react';

const Help: React.FC<{}> = () => {
  return (
    <div>
      <h1>Help</h1>
      <p>You can visit a station by clicking on a station on the previous page.</p>

      <h2>About this app</h2>
      <p>You can find the code for this site on <a href="https://github.com/eoinobrien/luas-app/">Github</a></p>
    </div>
  );
}

export default Help;
