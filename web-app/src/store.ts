import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { useSelector } from "react-redux";

//Interfaces
interface Todo {
  id: number;
  done: boolean;
  text: string;
}

//setup for slice interface
//TodosSlcieState => accessed by todos: => {todos: {id, done, text}}
interface TodosSliceState {
  todos: Todo[];
}



//const initSt:corrsp. to TodosSliceState
// NOTE NOTE thise TodosSLice only refer to the compoinet ahta are specifficaly implemtned for thee redux store of todos, the same msut be first reproduceed on the diffrent scope/SLice of redux RTK, NOTE NOTE Impeorta, to discern the diff sccpes and purposesd of each SLICDE as the complex procjts  will get
const initialState: TodosSliceState = { //must be initialState, since it is hard-coded parameters name of createSlice fn
  todos: [],
  //todos: [{id:1, done:true, text:"k"}], //init:=> id, done, text empty
};

// must See web:https://redux-toolkit.js.org/usage/usage-with-typescript
//name, initialState, reducers (mandatory of createSlice)
export const todosSlice = createSlice({
  name: "reducerNamespace", //name of Slice // The slice's name. Used to namespace the generated action types.
  initialState, //NOTE: hardcoded parameters of fn //createSlice native //defautl val, when reducer:(another:attr of createSlice) that will be assigned
  reducers: {//mapping from action types to action-type-specific case reducer functions.
    //ACTION: addTodo: (state:initSt. @start of Type/struct=TodosSliceState, action: )
    addTodo: (state, action: PayloadAction<string>) => { //state infered due to initailState (=hard-coded param)
    //addTodo: (state, action) => { // just fine without any type <> of ActionPayload it make it robust//payload action mean what will be inside payload<state the type here>//it is just best Pratice to typieren der "action:{ts-type-here} Unfortunately, as the keys are only strings, using that API TypeScript can neither infer nor validate the action types
      state.todos = [ // alter State.todos as following:
        ...state.todos, //spread the already exisiting one toods, in state
        {
          id: state.todos.length, // NOT SAVE //// ig lenght always higher then index itself (due to indext start at 0), THUS making it valid/unique id each time
          text: action.payload, //payload = inputed text now becomes text-field val
          done: false, //must be false (yet undone) since it it newly crated TODO now
        },
      ];
    },
    //removeTodo: (state, action)
    removeTodo: (state, action: PayloadAction<number>) => { //the type of action: is for clearinece/KLARHEIT in code
      state.todos = state.todos.filter(({ id }) => id !== action.payload); //NOT WORKING; bad USAGE NOT UNIQE; since leath will deduple cuz once detlaet length go down as welm
    },
  },
});
//ACIONTS-obj:{addTodo, removeTodo}
export const { addTodo, removeTodo } = todosSlice.actions; //action/fn //dev make it easy to access, thus so easy as oop

//see web: https://redux-toolkit.js.org/api/configureStore
const store = configureStore({ //imporved createStore for UX
  //configureStore accepts a single configuration object parameter, with the following options:

  //reducer:{}
  //* A single reducer function that will be used as the root reducer, or an
  //* object of slice reducers that will be passed to `combineReducers()`.
  reducer: { //preform "combineReducer()" on todosSlice.reducer (see l. 27, 30) those lone are passed (so to say)
    // todos, deriverd name from createSlice namespace (l. 27)
    //const todosSlice = cratedSlice({})
    reducerNamespace: todosSlice.reducer, //composite the redueres, of "todos"
  }, //reducernamespce, if mutiple they should be name accordingly, here the curr one should be named: "todos" the name is corresposds to the name:"smth" attr from the createSlice fucn (see l. 27)
}); //another may be naemd feed/lgoin whatever

type RootState = ReturnType<typeof store.getState>; //reuduerNamespce : TodosSliceState, thus is type of Todo[], inwhich [{id, text, done}]
//reassigne the state
//the current state is infered fomr l.14 of interface TodosSliceState thus makeing the "todos":Todo[]
export const selectTodos = (state: RootState) => state.reducerNamespace.todos; //propagating hte rootState via arg state on to SelectTods, thus lets the SelectTods, poiints to the Todo[] ig
//selectTodos assigine to it the interface TodosSliceState with prop todos:Todo[] THUS TYPESCIRPT WORK ROBUSTLY

export default store;
//https://redux-toolkit.js.org/usage/usage-guide
