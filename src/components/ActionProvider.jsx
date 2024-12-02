// ActionProvider.js
import { fastapiAxios, expressAxios } from "../customAxios";
import React from 'react';
import { useEffect } from "react";

const ActionProvider = ({ createChatBotMessage, setState, children, state}) => {

  const generateMission = async() => {
    console.log(state)
    let randomWord = null

    if (!state.word){
      try {
        const response = await expressAxios.get('/api/random-word');
        console.log("randomWord:", response.data)
        randomWord = {
          word: response.data.word,
          meaning: response.data.meanings[0].definition
        }
      } catch (error) {
        console.error('Error fetching random word:', error);
      }
    }

    try{
      const mission = await fastapiAxios.post('/api/mission', { 
        word: state.word || randomWord.word, 
        meaning: state.definition || randomWord.meaning,
        mission_type: -1, // -2로 오류 유도. 기본 -1
        past_missions: [] // not used
      }).then(res => res.data.mission);
      console.log("generateMission:", mission)

      const botMessage = createChatBotMessage(
        <div>
          <h3>미션</h3>
          <p>{mission}</p>
        </div>
      );
      updateMessages(botMessage);
      setState((prev) => ({
        ...prev,
        mission: mission,
      }))

    } catch (error) {
      console.error("Error generateMission:", error)
    }
  }

  const generateFeedback = async(message) => {
    try {
      const feedback = await fastapiAxios.post('/api/feedback', { 
        word: state.word, 
        meaning: state.definition, 
        user_input: message, // ""로 오류 유도
        mission: state.mission,
        mission_type: -1, // not used
      }).then(res => res.data.message);

      const botMessage = createChatBotMessage(
        <div>
          <h3>피드백</h3>
          <p>{feedback}</p>
        </div>
        ,{
          widget: "missionBtn"
        });
      updateMessages(botMessage);

    } catch (error) {
      console.error("Error handleUserInput:", error)
    }
  };

  const updateMessages = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }

  useEffect(() => {
    generateMission();
  }, []);

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            generateMission,
            generateFeedback,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;