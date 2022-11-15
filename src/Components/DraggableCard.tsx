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

export default DraggableCard;