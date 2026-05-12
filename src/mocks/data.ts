export interface Poll {
  id: string;
  title: string;
  question?: string;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
  creatorId: string;
  creatorPw: string;
  createdAt: string;
}
