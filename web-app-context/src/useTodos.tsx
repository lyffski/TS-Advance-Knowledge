import React, {
  useCallback,
  useReducer,
  createContext,
  useContext,
} from "react";

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

// same as == const TodoContext = React.createContext<TodoContext>({} as TodoContext)

//infered
type UseTodosManagerResult = ReturnType<typeof useTodosManager>; //func func arr, this info will be passed into TodoContext as type => recives 3 types (arr, fn, fn)

//useContext
// same as == const TodoContext = React.createContext<TodoContext>({} as TodoContext)
const TodoContext = createContext<UseTodosManagerResult>({
  todos: [], //arr
  addTodo: () => {}, //fn
  removeTodo: () => {}, //fn
}); // THUS: crateContext<context> == ({context})

//mean = fn revices obj:(initialTodos:of type Todo[]):{retruns: arr, fn, fn}
// function fn(recieves-args):{return types == ReturnType<typeof useTodosManager> (see l. 18)} {code} => here: code=const = [todos, dispatch] = useReducer({all actoins-fn},initVals)
function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} { //const [state] = useReduer((reduer-fn),(initVals)), where state:=[todos, dispatch]
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, initialTodos); //init vals for useReducer(fn, initVals)

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo };
}

//useContext
export const TodosProvider: React.FunctionComponent<{
  
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => ( //useTuseTodosManager == useReduer fn // initTodos initVals
  <TodoContext.Provider value={useTodosManager(initialTodos)}> 
    {children}
  </TodoContext.Provider>
);

//<type UseTodosManagerResult = ReturnType<typeof useTodosManager>> 
//to exptect: return types are, as def above, {arr, fn, fn}
//createContext<gernic return types> 
//?!?!?! const useTodos: () => Todo[] (irritate)
export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};

// Generic: <ReturnType/Return of fn/action preformed by useReduer > of type arr, fn, fn

//USECASE:
//const CONTEXT_NAME = cratedContext<UseTodosManagerResult>({})
//useContext(CONTEXT_NAME)

//type UseTodosManagerResult = ReturnType<typeof useTodosManager>

// const TodoContext = createContext<UseTodosManagerResult>({
//   todos: [], //arr
//   addTodo: () => {}, //fn
//   removeTodo: () => {}, //fn
// });