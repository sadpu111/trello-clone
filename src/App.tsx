import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";


const Wrapper = styled.div`
  display: flex;
  width: 100vw;
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;



function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = (info: DropResult) => { // drag가 끝났을 때 실행되는 함수
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) { // 동일 board 내 이동
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index]; // 원소가 기존의 배열의 원소에서 하나의 객체({id: number, text: string}으로 바뀌었기 때문
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj) // 해당 자리에 배열의 원소인 객체를 추가
        return {
          ...allBoards, // (1) 기존 보드와
          [source.droppableId]: boardCopy, // (2) 이동이 발생한 보드에: 위의 boardCopy를 대입
        } // preToDos는 객체이므로 boardcopy(배열)이 아닌 전체 객체를 리턴해야 한다
      });
    }
    if (destination?.droppableId !== source.droppableId) { // 타 baord로의 이동
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      })
    }

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
          {Object.keys(toDos).map((boardId) => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />)}
          {/* Board에 표시될 toDos는 toDosState 안의 각각의 boardId(to do, doing, done)의 배열들. Board의 property로서의 toDos는 Baord 컴포넌트에서 정의 */}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
