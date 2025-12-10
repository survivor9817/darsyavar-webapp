export interface FeedbackItem {
  id: string;
  label?: string;
  icon: string;
  className: string;
  isOn: boolean;
}

export interface FeedbackHookReturn {
  btnsMeta: FeedbackItem[];
  msgsMeta: FeedbackItem[];
  updateFeedback: (id: string) => void;
  getBtnsState: () => Record<string, boolean>;
  loadServerData: (data: Record<string, boolean>) => void;
  handleBtn: (id: string, state: boolean) => void;
  handleMsg: (id: string, state: boolean) => void;
}
