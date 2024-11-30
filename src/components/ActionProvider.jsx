// ActionProvider.js
import axios from "axios";
import React from 'react';
import { useEffect } from "react";

const ActionProvider = ({ createChatBotMessage, setState, children, state}) => {

  const generateMission = async() => {
    console.log(state)

    try{
      const mission = await axios.post('/api/mission', { word: state.word, meaning: state.definition }).then(res => res.data.mission);

      const botMessage = createChatBotMessage(`미션: ${mission}`);
      updateState(botMessage);

    } catch (error) {
      console.error("Error generateMission:", error)
    }
  }

  const generateFeedback = async(message) => {
    try {
      const feedback = await axios.post('/api/feedback', { word: state.word, meaning: state.definition, user_input: message }).then(res => res.data.message);

      const botMessage = createChatBotMessage(
        `피드백:\n${feedback}`,{
          widget: "missionBtn"
        });
      updateState(botMessage);

    } catch (error) {
      console.error("Error handleUserInput:", error)
    }
  };

  const updateState = (message) => {
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

// class ActionProvider {
//   constructor(createChatBotMessage, setStateFunc) {
//     this.createChatBotMessage = createChatBotMessage;
//     this.setState = setStateFunc;
//   }

//   generateMission = async ({word, definition}) => {
//     console.log("Start generateMission")
//     try {
//       const loadingMessage = this.createChatBotMessage("Generating your mission...");
//       this.updateChatbotState(loadingMessage);

//       const response = await axios.post('/api/mission', { word: word, meaning: definition });
//       // setChatContext({ ...chatContext, "mission": response.data.mission })

//       const missionMessage = this.createChatBotMessage(
//         `Here's your mission: ${response.data.mission}`,
//       )
//       this.updateChatbotState(missionMessage)

//       console.log("generateMission:", response.data)
//     } catch (err) {
//       console.error('Error generateMission:', err);
//       const errorMessage = this.createChatBotMessage(
//         "Sorry, I couldn't process your request at this time. Please try again later."
//       );
//       this.updateChatbotState(errorMessage);
//     }
//   };

//   handleLearningMission = (word, mission) => {
//     const botMessage = this.createChatBotMessage(
//       `Let's learn about the word "${word}". Here's your mission: ${mission}`
//     );
//     this.updateChatbotState(botMessage);
//   }

//   handleNormalMessage = (message) => {
//     const botMessage = this.createChatBotMessage(`You said: "${message}". How can I help you with this?`);
//     this.updateChatbotState(botMessage);
//   }

//   updateChatbotState = (message) => {
//     this.setState((prevState) => ({
//       ...prevState,
//       messages: [...prevState.messages, message],
//     }));
//   }
// }

export default ActionProvider;