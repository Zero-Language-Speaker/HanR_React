// MessageParser.js
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    if (/^[a-zA-Z]+$/.test(message)) {
      this.actionProvider.handleLearningMission(message);
    } else {
      this.actionProvider.handleNormalMessage(message);
    }
  }
}

export default MessageParser;