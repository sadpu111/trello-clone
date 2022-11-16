import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: IToDo[]; // 여러 개의 boardId의 key와 IToDo 인터페이스의 배열
}


export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: { // 각자의 Board가 가질 boardId 포함(to_do, doing, done)
    "To Do": [], // string[] => string으로 이뤄진 array
    Doing: [], // IToDoState를 적용하기 전에는 3개의 property(to_do, doing, done)에 string으로 이뤄진 배열로 제한적임
    Done: []
  },
});