// Config.jsx
import { createChatBotMessage } from "react-chatbot-kit";
import botIcon from './ChatBot.png';
import LearningMission from "./LearningMission";
import MissionBtn from "./MissionBtn";

const config = (chatContext) => ({
  initialMessages: [createChatBotMessage(
    chatContext.word ?
    <div style={{color: 'black'}}>단어 <b>{chatContext.word}</b>에 대한 미션을 생성하고 있어요...</div> :
    <div style={{color: 'black'}}>랜덤 단어에 대한 미션을 생성하고 있어요...</div>
    )],
  
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
  ],

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
        backgroundColor: "#a6dcf2",
      },
      chatButton: {
        backgroundColor: "#5ccc9d",
      },
    },
});

export default config;