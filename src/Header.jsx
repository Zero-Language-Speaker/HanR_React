import React from 'react';

function Header() {
  return (
    <header className="flex gap-3.5 self-end text-3xl text-center text-black whitespace-nowrap">
      <img src="https://cdn.builder.io/api/v1/image/assets/dadf80c1a25f4be891ac86a023bea42e/9797aaec985ba02e463835c4d5a6afea5f8a4707a6dfe65c2687a4a265666e99?apiKey=dadf80c1a25f4be891ac86a023bea42e&" alt="" className="object-contain shrink-0 my-auto w-10 aspect-square fill-purple-200" />
      <div className="flex flex-col">
        <div className="px-2.5 py-4 bg-zinc-300">
          유저네임
        </div>
      </div>
    </header>
  );
}

export default Header;