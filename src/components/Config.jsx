// Config.jsx
import { createChatBotMessage } from "react-chatbot-kit";
import botIcon from './ChatBot.png';
import LearningMission from "./LearningMission";
import MissionBtn from "./MissionBtn";

const config = (chatContext) => ({
  initialMessages: [],
  
  state: {
    currentMission: null,
    word: chatContext.word,
    definition: chatContext.definition
  },

  widgets: [
    {
      widgetName: "missionBtn",
      widgetFunc: (props) => <MissionBtn {...props}/>
    },
    {
      widgetName: "generateMission",
      widgetFunc: (props) => props.actions.generateMission()
    }
  ],
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