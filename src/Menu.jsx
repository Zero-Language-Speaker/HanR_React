import React from 'react';
import MenuItem from './MenuItem';

const menuItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/dadf80c1a25f4be891ac86a023bea42e/788ed3e22ea62754f1772a3879d077cf4db8ac7bcc437ed648831b4befe00a7a?apiKey=dadf80c1a25f4be891ac86a023bea42e&", label: "단어 학습", shortcut: "⇧A" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/dadf80c1a25f4be891ac86a023bea42e/788ed3e22ea62754f1772a3879d077cf4db8ac7bcc437ed648831b4befe00a7a?apiKey=dadf80c1a25f4be891ac86a023bea42e&", label: "시나리오 학습", shortcut: "⇧A" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/dadf80c1a25f4be891ac86a023bea42e/40f37bac946794b9354c240868b3f8fe101bcb9b1bf75c959e6721f60574f0c1?apiKey=dadf80c1a25f4be891ac86a023bea42e&", label: "문맥 학습", shortcut: "⇧A" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/dadf80c1a25f4be891ac86a023bea42e/9245cc2a5e6b7b8331b2f62a2eaa3899cbfd4a717b7d0c38a94f8c09126d5098?apiKey=dadf80c1a25f4be891ac86a023bea42e&", label: "단어장 이동", shortcut: "⇧A" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/dadf80c1a25f4be891ac86a023bea42e/9245cc2a5e6b7b8331b2f62a2eaa3899cbfd4a717b7d0c38a94f8c09126d5098?apiKey=dadf80c1a25f4be891ac86a023bea42e&", label: "Menu Label", shortcut: "⇧A", description: "Menu description." },
];

function Menu() {
  return (
    <nav className="border-solid border-[color:var(--sds-color-border-default-default)] border-[length:var(--sds-size-stroke-border)] rounded-[var(--sds-size-radius-200)] shadow-[var(--sds-size-depth-0_var(--sds-size-depth-100)_var(--sds-size-depth-100)_var(--sds-size-depth-negative-025)_var(--sds-color-black-100);background-color:var(--sds-color-background-default-default);display:flex;margin-top:38px;min-height:469px;padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:139px;flex-direction:column;overflow:hidden;justify-content:start;padding:var(--sds-size-space-200);media-max-width-991-px:[object_Object];}] max-md:pb-24">
      <h2 className="overflow-hidden px-4 pt-2 pb-1 w-full leading-snug font-[number:var(--sds-typography-body-font-weight-strong)] text-[color:var(--sds-color-text-default-default)] text-[length:var(--sds-typography-body-size-medium)]">
        한글한알 메뉴
      </h2>
      <div className="flex flex-col justify-center px-4 py-2 w-full">
        <hr className="flex w-full bg-zinc-300 min-h-[1px]" />
      </div>
      <ul className="flex overflow-hidden flex-col w-full rounded-lg font-[number:var(--sds-typography-body-font-weight-regular)] text-[color:var(--sds-color-text-default-default)] text-[length:var(--sds-typography-body-size-medium)]">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </ul>
    </nav>
  );
}

export default Menu;