class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  startScenarioLearning() {
    const message = this.createChatBotMessage(
      "[학습 미션]\n주어진 상황에서 \"감축하다\"를 가지고 문장을 만들어보세요. 단, 각 상황마다 다른 뜻을 사용해야 합니다.\n(회사에 대해):\n(교수님에 대해):"
    );
    this.updateChatbotState(message);
  }

  handleUserResponse(userMessage) {
    // Check if the user's response contains both required parts
    if (userMessage.includes("(회사에 대해):") && userMessage.includes("(교수님에 대해):")) {
      const feedback = this.createChatBotMessage(
        "[피드백]\n\"감축하다\"의 첫 번째 의미를 회사 문장에 아주 적절하게 적용하셨습니다. 교수님 문장에서는 두 번째 의미를 사용하는 미션이 있기에, 다음 번에는 예를 들어 \"교수님의 새 논문이 국제 학술지에 게재되어, 연구실 동료들과 함께 감축하는 시간을 가졌습니다\"처럼 교수님의 성취를 축하하는 문장을 만들어 보시면 좋겠습니다. 반복적인 연습을 통해 단어의 다양한 의미를 자연스럽게 연결하는 능력을 키우실 수 있을 거예요. 계속 노력하세요!"
      );
      this.updateChatbotState(feedback);
    } else {
      const promptMessage = this.createChatBotMessage(
        "두 가지 상황 모두에 대해 문장을 만들어주세요. (회사에 대해)와 (교수님에 대해) 모두 작성해 주세요."
      );
      this.updateChatbotState(promptMessage);
    }
  }

  handleDefault() {
    const message = this.createChatBotMessage(
      "죄송합니다. 이해하지 못했습니다. 학습 미션에 대한 답변을 작성해 주세요.",
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