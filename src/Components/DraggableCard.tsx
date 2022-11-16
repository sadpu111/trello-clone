import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components"

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function DraggableCard({toDo, index}: IDraggableCardProps ) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {/* key와 draggableId가 같아야 함(beautiful dnd) */}
      {(magic) => (
        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>{toDo}
        </Card>
      )}
    </Draggable>

  )
}

export default React.memo(DraggableCard); /* React.memo는 고차 컴포넌트(Higher Order Component)입니다. 컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, React.memo를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다. 즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다. */