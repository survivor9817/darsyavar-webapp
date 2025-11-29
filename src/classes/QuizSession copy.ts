export class Quiz {
  sessionId: string;
  startTime: Date;
  endTime: Date | null;
  status: "in-progress" | "completed";

  bookName: string;
  filters: any;
  questionIDs: any[];
  currentQIndex: number;
  currentQID: string;
  questionsCount: number;
  feedbackResults: Record<string, any>;

  constructor(bookName: string, filters: any, questionIDs: any[] = []) {
    this.sessionId = this.generateSessionId();
    this.startTime = new Date();
    this.endTime = null;
    this.status = "in-progress";

    this.bookName = bookName;
    this.filters = filters;
    this.questionIDs = questionIDs;
    this.currentQIndex = 0;
    this.currentQID = questionIDs[this.currentQIndex] || "";
    this.questionsCount = questionIDs.length;
    this.feedbackResults = {};
  }

  private generateSessionId(): string {
    return "sess_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
  }

  goToQuestion(indexNumber: number): void {
    if (indexNumber < 0 || indexNumber >= this.questionsCount) return;

    this.currentQIndex = indexNumber;
    this.currentQID = this.questionIDs[this.currentQIndex].id;

    // Optional: emit event or callback here
    const index = this.currentQIndex;
    const totalNumber = this.questionsCount;
    const data = this.questionIDs[index];
    const feedbackObj = this.getCurrentFeedback();
  }

  goToNextQuestion(): void {
    const highestIndex = this.questionsCount - 1;
    const lastIndex = this.currentQIndex;
    const nextIndex = Math.min(highestIndex, lastIndex + 1);

    if (lastIndex !== highestIndex || nextIndex !== highestIndex) {
      this.goToQuestion(nextIndex);
    }
  }

  goToPrevQuestion(): void {
    const lastIndex = this.currentQIndex;
    const prevIndex = Math.max(0, this.currentQIndex - 1);

    if (lastIndex !== 0 || prevIndex !== 0) {
      this.goToQuestion(prevIndex);
    }
  }

  saveFeedback(questionId: string, feedbackObj: any): void {
    this.feedbackResults[questionId] = feedbackObj;
  }

  getFeedback(questionId: string): any {
    return this.feedbackResults[questionId] || null;
  }

  getCurrentFeedback(): any {
    return this.getFeedback(this.currentQID);
  }

  handleFeedbackChanges(clickedBtn: any): void {
    const feedbackObj = this.getCurrentFeedback();
    if (feedbackObj) {
      feedbackObj.updateFeedbackObj(clickedBtn);
    }
    this.saveFeedback(this.currentQID, feedbackObj);
  }

  getDuration(): number {
    const endTime = this.endTime || new Date();
    const durationInMs = Math.abs(endTime.getTime() - this.startTime.getTime());
    return Math.floor(durationInMs / (1000 * 60));
  }

  endSession(): void {
    this.endTime = new Date();
    this.status = "completed";
    console.log(this);
    console.log(this.getDuration());
  }
}
