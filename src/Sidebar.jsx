import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import IconButton from './IconButton';

function Sidebar() {
  return (
    <aside className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
      <div className="grow max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[77%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-3.5 pt-5 mx-auto w-full bg-zinc-300 pb-[514px] max-md:pb-24">
              <Logo />
              <Menu />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[23%] max-md:ml-0 max-md:w-full">
            <IconButton />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;