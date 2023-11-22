import React from 'react';

type PropsType = {
  title: string;
};
function Header2({ title }: PropsType) {
  return (
    <div className="w-auto max-w-xl">
      <div className="text-4xl font-extrabold text-start">
        {title}
      </div>
    </div>
  );
}

export default Header2;
