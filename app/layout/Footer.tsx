import React from 'react';

const Footer: React.FC = () => {
  return (
    <div style={footerStyle}>
      &copy; 2023 Powered by Eren :) Assessment Project
    </div>
  );
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#808080', 
  color: 'white',
  textAlign: 'center',
  padding: '10px',
};

export default Footer;