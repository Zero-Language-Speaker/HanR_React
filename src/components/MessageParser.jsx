// MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log("MessageParser:", message);
    actions.generateFeedback(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

// class MessageParser {
//   constructor(actionProvider, state) {
//     this.actionProvider = actionProvider;
//     this.state = state;
//   }

//   parse(message) {
//     this.actionProvider.handleLearningMission(message);
//     console.log("MessageParser: handleNormalMessage")

//     // if (/^[a-zA-Z]+$/.test(message)) { // 영어 알파벳만 들어올 때
//     //   this.actionProvider.handleLearningMission(message);
//     //   console.log("MessageParser: handleLearningMessage")
//     // } else {
//     //   this.actionProvider.handleNormalMessage(message);
//     //   console.log("MessageParser: handleNormalMessage")
//     // }
//   }
// }

export default MessageParser;