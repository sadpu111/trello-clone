import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import DraggableCard from "./Components/DraggableCard";


const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;




function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => { // drag가 끝났을 때 실행되는 함수
    if (!destination) return; // 드래그가 끝나는 곳이 destination이 아니라면 그냥 놔둠
    /*     setToDos(preToDo => {
          const copyToDo = [...preToDo];
          copyToDo.splice(source.index, 1);
          // 1) source.index 위치에서 1개 원소 삭제(드래그하는 원소 삭제)
          copyToDo.splice(destination?.index, 0, draggableId)
          // 2) destination.index 위치에 draggableId(toDo 내용) 추가(옮기는 위치에 드래그한 원소 추가)
          return copyToDo
        }); */
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]}/>)}
          {/* Board에 표시될 toDos는 toDosState 안의 각각의 boardId(to_do, doing, done)의 배열들 */}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
