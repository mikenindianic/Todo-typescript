import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApi } from "../api/utils";
import Todos from "../models/todo";
import { getTodo } from "../store/action";

import { RootState } from "../store/store";
import style from "../style/Todos.module.css";
import TodoItems from "./TodoItems";
export interface containerProps {
  loaderImg: string;
}
const Todo: React.FC<{
  items: Todos[];
  removeTodo: (todoID: number) => void;
  handleUpdate: (text: string) => void;
}> = (props) => {
  // const { data }: any = useGetTodoDataQuery("");
  const TodoData = useSelector((state: RootState) => state.todo.addTodo);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      const todos = await getApi(setIsLoading);
      dispatch(getTodo(todos));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ul className={style.todos}>
        {TodoData === null || TodoData.length === 0 ? (
          <div className={style.message}>
            Nothing to show!!! Add new tasks...
          </div>
        ) : isLoading ? (
          <img src="/loader.gif" alt="loader" />
        ) : (
          Object.values(TodoData)?.map((item: any, index: number) => {
            return (
              <TodoItems
                id={item?.id}
                text={item?.text}
                removeTodo={props.removeTodo}
                updateTodo={props.handleUpdate}
                objectKey={Object.keys(TodoData)}
                index={index}
              />
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Todo;
