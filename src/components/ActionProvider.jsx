// ActionProvider.js
import axios from "axios";
import React from 'react';
import { useEffect } from "react";

const ActionProvider = ({ createChatBotMessage, setState, children, state}) => {

  const generateMission = async() => {
    console.log(state)

    try{
      const mission = await axios.post('http://localhost:8000/api/mission', { 
        word: state.word, 
        meaning: state.definition,
        mission_type: -1,
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
      const feedback = await axios.post('http://localhost:8000/api/feedback', { 
        word: state.word, 
        meaning: state.definition, 
        user_input: message,
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