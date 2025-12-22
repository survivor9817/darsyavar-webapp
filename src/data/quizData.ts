// ✅ ساختار صحیح در TypeScript
const session = {
  sessionId: "session_123",
  userId: "user_456",
  //   questionIds را در جدول جداگانه ذخیره کنید، نه اینجا
  //   questionIds: [1, 2, 3],
  status: "in-progress", // ekhtiaari. tooye hamon state bashe base dg...
  createdAt: new Date(),
  completedAt: null,
  bookName: "زیست‌شناسی ۱",
  lastVisitedQuestionId: 2,
  lastVisitedQuestionIndex: 1,
  questionsCount: 10,
};

// و جدول جداگانه برای سوالات:
const sessionQuestions = [
  { sessionId: "session_123", questionId: 1, position: 0 },
  { sessionId: "session_123", questionId: 2, position: 1 },
  { sessionId: "session_123", questionId: 3, position: 2 },
  { sessionId: "session_123", questionId: 4, position: 3 },
];

// feedbackhaa
const userFeedbacks = [
  {
    userId: "user_456",
    questionId: 1,
    feedbackType: "correct",
    value: true,
  },
  {
    userId: "user_456",
    questionId: 1,
    feedbackType: "star",
    value: true,
  },
  {
    userId: "user_456",
    questionId: 2,
    feedbackType: "star",
    value: true,
  },
  {
    userId: "user_456",
    questionId: 2,
    feedbackType: "report",
    value: true,
  },
];

// ==========================================
// 3. Helper Functions برای Frontend
// ==========================================

// تبدیل آرایه feedback به object برای نمایش راحت‌تر در UI
function getFeedbacksForQuestion(questionId: number, userId: string) {
  const feedbacks = userFeedbacks.filter((f) => f.questionId === questionId && f.userId === userId);

  return {
    correct: feedbacks.find((f) => f.feedbackType === "correct")?.value || false,
    incorrect: feedbacks.find((f) => f.feedbackType === "incorrect")?.value || false,
    like: feedbacks.find((f) => f.feedbackType === "like")?.value || false,
    star: feedbacks.find((f) => f.feedbackType === "star")?.value || false,
    report: feedbacks.find((f) => f.feedbackType === "report")?.value || false,
  };
}

// دریافت تمام feedbackهای یک session
function getSessionFeedbacks(sessionQuestionIds: number[], userId: string) {
  return sessionQuestionIds.map((qId) => ({
    questionId: qId,
    feedbacks: getFeedbacksForQuestion(qId, userId),
  }));
}
