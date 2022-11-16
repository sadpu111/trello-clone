import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[]; // toDoState의 확장성을 위해 작성. 아래의 to_do, doing, done 외에 사용자가 boardId를 추가할 수 있도록
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: { // 각자의 Board가 가질 boardId 포함(to_do, doing, done)
    to_do: ["a", "b"], // string[] => string으로 이뤄진 array
    doing: ["c", "d"], // IToDoState를 적용하기 전에는 3개의 property(to_do, doing, done)에 string으로 이뤄진 배열로 제한적임
    done: ["e", "f", "g"]
  },
})