import React from 'react';

type PropsType = {
  title: string;
  summery?:string
};
function Header({ title, summery}: PropsType) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-lg md:text-2xl lg:text-4xl font-extrabold text-center">
        {title}
      </div>
      <div className="text-md  font-bold text-center">
        {summery}
      </div>
    </div>
  );
}

export default Header;
