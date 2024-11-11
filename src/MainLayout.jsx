import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import RecommendationCards from './RecommendationCards';
import WordDisplay from './components/WordDisplay';

function MainLayout() {
  return (
    <div className="overflow-hidden bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-sm:hidden">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        <main className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start w-full max-md:mt-10 max-md:max-w-full">
            <Header />
            <RecommendationCards />
            <WordDisplay />
            <footer className="flex shrink-0 mt-6 max-w-full h-48 bg-zinc-300 rounded-[50px] w-[1255px]" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;