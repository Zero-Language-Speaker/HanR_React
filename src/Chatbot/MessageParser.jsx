class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes("시작") || lowerCaseMessage.includes("학습")) {
      this.actionProvider.startScenarioLearning();
    } else if (lowerCaseMessage.includes("(회사에 대해):") || lowerCaseMessage.includes("(교수님에 대해):")) {
      this.actionProvider.handleUserResponse(message);
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;