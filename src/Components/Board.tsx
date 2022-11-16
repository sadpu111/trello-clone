import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";


const Wrapper = styled.div`
width: 300px;
padding: 20px 10px;
padding-top: 10px;
background-color: ${(props) => props.theme.boardColor};
border-radius: 5px;
min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: string[]; // 여기서의 toDos에 대한 interface가 App에서 string[]를 요구
  boardId: string;
}

function Board({toDos, boardId}: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
    <Droppable droppableId={boardId}>
      {(magic) => (
        <div ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} toDo={toDo} index={index} />
          ))}
          {magic.placeholder}
          {/* 드래그 할 때 사이즈 변화 x */}
        </div>
      )}
    </Droppable>
    </Wrapper>
  );
}

export default Board;