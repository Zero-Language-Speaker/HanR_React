import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.currentMission = null;
  }

  async startScenarioLearning(word, meaning) {
    try {
      const response = await axios.post('https://4917-163-239-255-171.ngrok-free.app/api/Mission_query', {
        word: word,
        meaning: meaning,
        mission_type: -1,  // Let the backend choose randomly
        past_missions: []  // Implement this if you want to track past missions
      });

      this.currentMission = response.data;
      const message = this.createChatBotMessage(
        `[학습 미션]\n${this.currentMission.mission}\n\n예시 답변: ${this.currentMission.example_answer}`
      );
      this.updateChatbotState(message);
    } catch (error) {
      console.error('Error calling FastAPI:', error);
      this.handleDefault();
    }
  }

  async handleUserResponse(userMessage) {
    if (!this.currentMission) {
      this.handleDefault();
      return;
    }

    // Here you would typically send the user's response to the backend for evaluation
    // For now, we'll just provide a generic response
    const feedback = this.createChatBotMessage(
      "감사합니다. 당신의 답변을 받았습니다. 다음 미션을 시작하려면 '다음'이라고 입력해주세요."
    );
    this.updateChatbotState(feedback);
  }

  handleDefault() {
    const message = this.createChatBotMessage(
      "죄송합니다. 이해하지 못했습니다. '시작'이라고 입력하여 새로운 학습 미션을 시작해주세요.",
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