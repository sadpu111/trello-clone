import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Wrapper = styled.div`
width: 300px;
padding-top: 10px;
 background-color: ${(props) => props.theme.boardColor};
border-radius: 5px;
min-height: 300px;
display: flex;
flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
background-color: ${props =>     props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
flex-grow: 1;
transition: background-color 0.3s ease-in-out;
padding: 20px;

`;

interface IBoardProps {
  toDos: string[]; // 여기서의 toDos에 대한 interface가 App에서 string[]를 요구
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
            {/* 드래그 할 때 사이즈 변화 x */}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;