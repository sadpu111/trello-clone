import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";


const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => { // drag가 끝났을 때 실행되는 함수
    if(!destination) return ; // 드래그가 끝나는 곳이 destination이 아니라면 그냥 놔둠
    setToDos(preToDo => {
      const copyToDo = [...preToDo];
      copyToDo.splice(source.index, 1);
      // 1) source.index 위치에서 1개 원소 삭제(드래그하는 원소 삭제)
      copyToDo.splice(destination?.index, 0, draggableId)
      // 2) destination.index 위치에 draggableId(toDo 내용) 추가(옮기는 위치에 드래그한 원소 추가)
      return copyToDo
    })
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((todo, index) => (<Draggable key={todo} draggableId={todo} index={index}>
                  {/* key와 draggableId가 같아야 함(beautiful dnd) */}
                  {(magic) => (
                    <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>{todo}
                    </Card>
                  )}
                </Draggable>))}
                {magic.placeholder}
                {/* 드래그 할 때 사이즈 변화 x */}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
