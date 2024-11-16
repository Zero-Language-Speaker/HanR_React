class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
      
      if (lowerCaseMessage.includes("hello")) {
        this.actionProvider.greet();
      } else if (lowerCaseMessage.includes("scenario")) {
        this.actionProvider.handleScenario();
      } else {
        this.actionProvider.handleDefault();
      }
    }
  }
  
  export default MessageParser;