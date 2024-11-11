import React from 'react';

function MenuItem({ icon, label, shortcut, description }) {
  return (
    <li className="flex overflow-hidden gap-3 items-start px-4 py-3 w-full rounded-lg">
      <img src={icon} alt="" className="object-contain shrink-0 w-5 aspect-square" />
      <div className="flex flex-col flex-1 shrink basis-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 shrink self-stretch my-auto leading-snug basis-0">
            {label}
          </div>
          <div className="self-stretch my-auto leading-none whitespace-nowrap rounded-lg">
            {shortcut}
          </div>
        </div>
        {description && (
          <div className="mt-1 leading-snug text-[color:var(--sds-color-text-default-secondary)] text-[length:var(--sds-typography-body-size-small)]">
            {description}
          </div>
        )}
      </div>
    </li>
  );
}

export default MenuItem;