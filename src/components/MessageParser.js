// MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("시나리오")) {
        this.actionProvider.handleScenario();
      }
    }
  }
  
  export default MessageParser;