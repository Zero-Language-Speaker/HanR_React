import React from 'react';

function RecommendationCard({ title }) {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex relative grow gap-2.5 items-start px-12 py-8 text-5xl text-center text-black min-h-[119px] max-md:px-5 max-md:mt-10 max-md:text-4xl">
        <div className="flex absolute right-0 bottom-0 z-0 shrink-0 items-center self-start bg-white rounded-lg border border-solid border-zinc-300 h-[119px] min-w-[240px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[430px] max-md:max-w-full" />
        <div className="z-0 my-auto w-[337px] max-md:text-4xl">
          {title}
        </div>
      </div>
    </div>
  );
}

function RecommendationCards() {
  return (
    <section className="mt-8 ml-36 max-w-full w-[910px]">
      <div className="flex gap-5 max-md:flex-col">
        <RecommendationCard title="오늘의 추천 단어" />
        <RecommendationCard title="오늘의 복습 단어" />
      </div>
    </section>
  );
}

export default RecommendationCards;