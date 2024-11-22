import React from 'react'
import { FadeLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50hv",
      }}
    >
      <FadeLoader color="#148f38" />
    </div>
  );
}

export default Loader