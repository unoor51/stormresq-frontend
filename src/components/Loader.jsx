import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500 border-solid"></div>
  </div>
);

export default Loader;