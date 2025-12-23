// ✅ ساختار صحیح در TypeScript
const books = [
  { id: 111216, name: "زیست شناسی ۱" },
  { id: 111216, name: "زیست شناسی ۲" },
  { id: 111216, name: "زیست شناسی ۳" },
  { id: 111216, name: "علوم تجربی ۷" },
  { id: 111216, name: "علوم تجربی ۸" },
  { id: 111216, name: "علوم تجربی ۹" },
];

const session = {
  sessionId: "session_123",
  userId: "user_456",
  //   questionIds را در جدول جداگانه ذخیره کنید، نه اینجا
  //   questionIds: [1, 2, 3],
  status: "in-progress", // ekhtiaari. tooye hamon state bashe base dg...
  createdAt: new Date(),
  completedAt: null,
  bookId: "bookid111216",
  lastVisitedQuestionId: 2,
  lastVisitedQuestionIndex: 1,
  questionsCount: 10,
};

// و جدول جداگانه برای سوالات:
// const sessionQuestions = [
//   { sessionId: "session_123", questionId: 1, position: 0 },
//   { sessionId: "session_123", questionId: 2, position: 1 },
//   { sessionId: "session_123", questionId: 3, position: 2 },
// ];

const sessionQuestionIDs = [
  { sessionId: "session_123", position: 0, questionId: 1 },
  { sessionId: "session_123", position: 1, questionId: 2 },
  { sessionId: "session_123", position: 2, questionId: 3 },
];

// feedbackhaa
// answer yaa true | false | null
const userFeedbacks = [
  {
    questionId: 1,
    userId: "user_123",
    answer: false,
    isLiked: true,
    isStarred: true,
    isReported: false,
  },
  {
    questionId: 2,
    userId: "user_123",
    answer: true,
    isLiked: true,
    isStarred: true,
    isReported: false,
  },
  {
    questionId: 3,
    userId: "user_123",
    answer: false,
    isLiked: true,
    isStarred: true,
    isReported: false,
  },
];

// function make

// ==========================================
// 3. Helper Functions برای Frontend
// ==========================================

// تبدیل آرایه feedback به object برای نمایش راحت‌تر در UI
function getFeedbacksForQuestion(questionId: number, userId: string) {
  const feedbacks = userFeedbacks.filter((f) => f.questionId === questionId && f.userId === userId);

  function turnAnswerToItsBtnState(btnType: string) {
    const answer = feedbacks.find((f) => f.type === "answer")?.value;
    if (answer === null) return false;
    if (btnType === "isCorrect") return answer === true;
    if (btnType === "isIncorrect") return answer === false;
    return false;
  }

  return {
    isCorrect: turnAnswerToItsBtnState("isCorrect"),
    isIncorrect: turnAnswerToItsBtnState("isIncorrect"),
    isLike: feedbacks.find((f) => f.type === "isLiked")?.value || false,
    isStar: feedbacks.find((f) => f.type === "isStarred")?.value || false,
    isReport: feedbacks.find((f) => f.type === "isReported")?.value || false,
  };
}

// دریافت تمام feedbackهای یک session
function getSessionFeedbacks(sessionQuestionIds: number[], userId: string) {
  return sessionQuestionIds.map((qId) => ({
    questionId: qId,
    feedbacks: getFeedbacksForQuestion(qId, userId),
  }));
}

// vaghti mizani roye soale badi yaa ghabli dokmesh becharkhe sheklesh loading beshe
