// Config.jsx
import { createChatBotMessage } from "react-chatbot-kit";
import botIcon from './ChatBot.png';

const config = {

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

  initialMessages: [
    createChatBotMessage("안녕하세요! 단어 학습을 시작하려면 '시작'이라고 입력해주세요."),
  ],
  
  botName: "ScenarioBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;