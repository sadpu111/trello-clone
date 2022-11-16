import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
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
background-color: ${props => props.isDraggingOver
    ? "#b2bec3"
    : props.isDraggingFromThis
      ? "#dfe6e9"
      : "transparent"};
flex-grow: 1;
transition: background-color 0.3s ease-in-out;
padding: 20px;
`;
const Form = styled.form`
width: 100%;
input {
  width: 100%;
}
`;


interface IBoardProps {
  toDos: IToDo[]; // 여기서의 toDos에 대한 interface가 App에서 string[]를 요구
  boardId: string;
};
interface IForm {
  toDo: string;
};

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => { // data(form으로부터 전달받는 객체 전체 중 toDo(input의 register를 통해 정의))
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]:[
          newToDo, ...allBoards[boardId] // newToDo: 추가된 객체, allBoards[boardId]: 추가된 boardId의 배열을 구성하는 기존 객체들
        ]
      }
    })
    setValue("toDo", "");
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: true })} type="text" placeholder={`Add a task on ${boardId}`}>
        </input>
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />
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