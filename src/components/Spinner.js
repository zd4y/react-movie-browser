import React from 'react';

export default function Spinner(props) {
  return (
    <div {...props} className="spinner-box">
      <svg
        className="spinner"
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          fill="none"
          strokeWidth={6}
          strokeLinecap="round"
          cx={33}
          cy={33}
          r={30}
        />
      </svg>
    </div>
  );
}
