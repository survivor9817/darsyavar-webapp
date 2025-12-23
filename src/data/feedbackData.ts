export const feedbackBtnData = [
  {
    id: "isCorrect",
    isOn: false,
    icon: "check_circle",
    className: "correct",
  },
  {
    id: "isIncorrect",
    isOn: false,
    icon: "cancel",
    className: "incorrect",
  },
  {
    id: "isLike",
    isOn: false,
    icon: "favorite",
    className: "like",
  },
  {
    id: "isStar",
    isOn: false,
    icon: "stars",
    className: "star",
  },
  {
    id: "isReport",
    isOn: false,
    icon: "error",
    className: "report",
  },
];

export const feedbackMsgData = [
  {
    id: "isCorrect",
    isOn: false,
    label: "درست گفتم!",
    icon: "check_circle",
    className: "correct",
  },
  {
    id: "isIncorrect",
    isOn: false,
    label: "اشتباه گفتم!",
    icon: "cancel",
    className: "incorrect",
  },
  {
    id: "isLike",
    isOn: false,
    label: "سؤال قشنگیه!",
    icon: "favorite",
    className: "like",
  },
  {
    id: "isStar",
    isOn: false,
    label: "سؤال مهمیه!",
    icon: "stars",
    className: "star",
  },
  {
    id: "isReport",
    isOn: false,
    label: "ایراد داره!",
    icon: "error",
    className: "report",
  },
];

export type feedbackBtnsType = typeof feedbackBtnData;
export type feedbackMsgsType = typeof feedbackMsgData;
