import React from 'react';

const Footer = () => {
  
  return (
    <footer className="bg-light text-center text-lg-start fixed-bottom" >
      {/* Footer details HERE */}
      <div className="text-center p-3" style={{ height: 60, backgroundColor: "#00ABB3", fontSize: 20, color: "#FAD6A5" }}> 
      <p className='mt-2'> &copy;{new Date().getFullYear()} Memory Game App - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
