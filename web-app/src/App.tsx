import React, { useCallback, useRef } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store, { selectTodos, addTodo, removeTodo } from "./store";
//import { useTodos } from "./useTodos"; //OBSOLTE
import "./App.css";



const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

type BoxProps = {
  children: React.ReactNode;
}

const Box: React.FunctionComponent<BoxProps> = ({ children }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);


const Button: React.FunctionComponent< //the have the same attr as native button
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string; 
  }
> = ({ title, children,key,form, style, ...rest }) => ( //...rest attribues are proviced, due to the long types// thus the "key" and "form" attr are extracted from ...rest, but they can be delte tform the {} sicnce they come so or so with button-gneric type of HTML
  <button
    {...rest} //sprad the genriec buttonHTML value 
    style={{ //not needed, but could be ovverrwiete if we wanted, the origian remain in .css etc
      ...style,
      backgroundColor: "red",
      color: "white",
      fontSize: "xx-large",
    }}
  > 
    {title ?? children}
  </button>
);
// x ?? y.then(if x != null && x != undefined) => if True.then(y) 
// purpose to setDefaultVal if from fn-args not provided
// ?? operator, x ?? y (x and y) must be same TYPE
// function getState(id: number) {
	
//   const defaultStateId = 1;    
//   const stateId = id ?? defaultStateId;
  
//   return this.database.find(stateId)    // no compilation error thrown
// }



//Custom Compoennet
function UL<T>({ //fn-args
  items, //expect params of items, render, itemClick, dep. on type:T (cuz generic)
  render,
  itemClick,
}: React.DetailedHTMLProps< //retun HTML ul TSX => return(tsx)
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement> & {
  items: T[]; ////main param//´items is array of type:T //here an redux list of array will be passed ig
  render: (item: T) => React.ReactNode; //dep. items render is (fn) with param item of type:T and => {return smth.}
  itemClick: (item: T) => void; //dep. items // itemClick: fn w/ item:parm of type:T, which return void
}) 
{ //fn-body
  //TSX: to list all entries as <ul> by mapping them
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)} {/* render as fn, given deconstructed items(={item}) */}
        </li>
      ))}
    </ul>
  );
}


function App() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const newTodoRef = useRef<HTMLInputElement>(null); //for curr user-input 

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current?.value) { //if set input
      dispatch(addTodo(newTodoRef.current.value)); //dispatch as payload
      newTodoRef.current.value = "";
    }
    else {return []}
  }, [dispatch]);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>

      <Heading title="Todos" />
      <UL
        items={todos} // the acutaly type are assigien here, not un UL func l.61
        itemClick={(todos) => alert(todos.id)}
        //itemClick={(items) => alert(items.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </>
        )}
      />
      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  );
}

const JustTheTodos = () => {
  const todos = useSelector(selectTodos);
  //console.log(selectTodos) CRUD mehotd Get (the redux-db sot ot say)
  console.log(todos)
  return (
    <UL
      items={(todos)} //must be array, coutom mene type so specifed
      itemClick={() => {}} //return: void
      render={() => <>{}</>} //any possibasle, since it work like func, here passed var outside fn, where then custuomo component run, it overrides it iwth local-args iwhtin scope of fn
    />
  );
};

const AppWrapper = () => (//redux proverlkoi
  <Provider store={store}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App />
      <JustTheTodos />
    </div>
  </Provider>
);

export default AppWrapper;
