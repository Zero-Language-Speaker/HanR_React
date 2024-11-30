import { useState } from 'react';

export const useWordModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  const openModal = (word) => {
    console.log('Opening modal with word:', word);
    setSelectedWord(word);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWord(null);
  };

  const updateSelectedWord = (updatedWord) => {
    setSelectedWord(updatedWord);
  };

  return { isModalOpen, selectedWord, openModal, closeModal, updateSelectedWord };
};