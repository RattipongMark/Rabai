// Bg.jsx
import React from 'react';
import "/src/index.css";

export default function Bg({ children }) {
  return (
    <div className='bg-default'>
            <div className=" bg-image h-dvh">
      {children}
    </div>
    </div>

  );
}
