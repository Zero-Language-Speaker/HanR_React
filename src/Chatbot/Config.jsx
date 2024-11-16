// Config.jsx
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: "ScenarioBot",
  initialMessages: [createChatBotMessage("안녕하세요! 시나리오 학습을 도와드릴게요.")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  // Remove the customComponents section if it's not needed for other purposes
};

export default config;