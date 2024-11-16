class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet() {
      const message = this.createChatBotMessage("Hello! Nice to meet you.");
      this.updateChatbotState(message);
    }
  
    handleScenario() {
      const message = this.createChatBotMessage(
        "Great! Let's start a scenario. Imagine you're at a restaurant. What would you like to order?"
      );
      this.updateChatbotState(message);
    }
  
    handleDefault() {
      const message = this.createChatBotMessage(
        "I'm not sure how to respond to that. Can you try rephrasing or ask about a scenario?",
        {
          withAvatar: true,
        }
      );
      this.updateChatbotState(message);
    }
  
    updateChatbotState(message) {
      this.setState(prevState => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;