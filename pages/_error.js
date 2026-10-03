import React from 'react';

function Error({ statusCode }) {
  return (
    <div style={{ padding: '40px', color: '#fff', background: '#030712', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</h1>
      <p><a href="/" style={{ color: '#38bdf8' }}>Return to SolarWatch Main Dashboard</a></p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 444;
  return { statusCode };
};

export default Error;
