// ActionProvider.js
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleLearningMission = (word) => {
    const botMessage = this.createChatBotMessage(`Let's learn about the word "${word}". Can you use it in a sentence?`);
    this.updateChatbotState(botMessage);
  }

  handleNormalMessage = (message) => {
    const botMessage = this.createChatBotMessage(`You said: "${message}". How can I help you with this?`);
    this.updateChatbotState(botMessage);
  }

  updateChatbotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;