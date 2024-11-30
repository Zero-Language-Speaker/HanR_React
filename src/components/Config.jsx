// Config.jsx
import { createChatBotMessage } from "react-chatbot-kit";
import botIcon from './ChatBot.png';
import LearningMission from "./LearningMission";

const config = (initialWord) => ({
  initialMessages: [createChatBotMessage(
    initialWord
    ? `'${initialWord}'에 대해 알아봅시다!`
    : `Hello! I'm here to help with your learning missions.`)],
  state: {
    currentMission: initialWord || null,
  },
  widgets: [],
  customMessages: {
    learning_mission: (props) => <LearningMission {...props} />,
  },


  customComponents: {
    botAvatar: (props) => (
      <div className="react-chatbot-kit-chat-bot-avatar">
        <img 
          src={botIcon}
          alt="Bot Avatar" 
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        />
      </div>
    ),
  },

  
  botName: "ScenarioBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
});

export default config;