
// MUST SEE: IRL USECASE: (see Web: https://blog.logrocket.com/mastering-mapped-types-typescript/)
// for Reference (see Web: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

//Mapped Types in ts

//Why use mapped types in TypeScript?
//Using mapped types in a program is especially useful when there is a need for a type to be derived from (and remain in sync with) another type.

// When you don’t want to repeat yourself, sometimes a type needs to be based on another type.
//Mapped types build on the syntax for index signatures, which are used to declare the types of properties which have not been declared ahead of time:

type MyFlexibleDogInfo = {
    name: string;
    [key: string]: string | number; // key-array allow to have nth possible fileds in the MyFlexDogInfo type
  };
  
  const dog:MyFlexibleDogInfo = { // here 3 key are assigend 
    name: "LG",
    breed: "Mutt",
    age: 2
  }
  
  interface DogInfo {
    name: string;
    age: number;
    field: string;
  }
  
  type OptionsFlag<Type> = { //property acts like KEY
    [Property in keyof Type]: null; //null should be alter to boolean for acutally having the option to be set ig
  }
  
  type DogInfoOptions = OptionsFlag<DogInfo>; //deriverd from DogInfo interface, it is then decoreted by OptionsFlag<DogInfo>, thus setting each assinge beforehanded file to null (see l. 24)
  
  type Listeners<Type> = { // TOBE assingen in l.49 => DogInfoListenres = Liesterners<DogInfo> thus have 3 attr (see l. 18) ::=> Property == (newValue: Type[Property]) => thus Property mean are to be assigned (yet not here) Type == generci thus i.e. 
    [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: ( // as to cast into another name (dep on defined terminloy/or functionaly in the Listernes<TYPE>) 
    //etc //key here funcKey, that can be freely expanded due to mappying types //creating custom func, which dep. on listiners, then assigen those name to be valid with listenToObject synatx etc (see l. 40, 51)
      newValue: Type[Property] //actauly value of key
    ) => void;
  } & { //MAPPING_TYPES: continaution for deleting func, before it was with change
    [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]?: (
      newValue: Type[Property]
    ) => void;
  }
  
  function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
    throw "Needs to be implemented";
  }
  
  const lg:DogInfo = {
    name: "LG",
    age: 13,
    field: "hkak"
  }
  
  type DogInfoListeners = Listeners<DogInfo>
  
  listenToObject(lg, {
    onNameChange: (v: string) => {}, //here ig u must actually inlcde the code that will updatae he Name and so forth
    onAgeChange: (v: number) => {},
    onAgeDelete: () => {} // here must be include the acually code delete age field
  })
  

