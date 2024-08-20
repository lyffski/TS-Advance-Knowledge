//TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally.
// to facilitky the commen types/vals stturct transformatoin etc
// ts utility types are all about SQL unions and disjuctions etc (the algebra behind this) whilst prefomr some assigne func etc in terms of chaning state/vals/strcut/mandatory etc
// for utils tpyes with ?:: it check whentat A extends (mean == A is assiganble to) undefined/whatever ? if so execute here : if not here
//(see Web: https://vhudyma-blog.eu/13-most-used-utility-types-in-typescript/)
//DLC: https://github.com/piotrwitek/utility-types of utilit types MUST HAVE

// returnType() elem is IMPORTANT, when creating React-hooks stuff
interface Dog {
    name: string;
    age: number;
    breed: string;
    dietary?: string;
  }
  
  type AnyDog = Partial<Dog>;
  type RequiredDog = Required<Dog>;
  type ReadonlyDog = Readonly<Dog>;
  
  type NoAge = Omit<Dog, "age">; //<set, what to exclude>
  type NameAndAge = Pick<Dog, "name" | "age">; //From T, pick a set of properties whose keys are in the union K
  
  type NoStrings = Exclude<string | number | undefined, string>; //Exclude from T those types that are assignable to U
  type JustStrings = Extract<string | number | undefined, string>; //Extract from T those types that are assignable to U
  type NoNull = NonNullable<string | Dog | undefined>; //Exclude null and undefined from T
  
  function groupByID<T, K extends keyof T>( //K key of T
    items: T[],
    key: K
  ): Record<string, Omit<T, K>> { ////Omit<set, what to exclude> :return Recordd<string, Omit<T,K>>
    return items.reduce((a, item) => { // reducer accummulate under name a the preformed actions (like mapping and a += item !!(tho, no plus but prefroems the l. 32 & l.33)!! item etc) //Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      const newObj = { ...item }; //
      delete newObj[key]; //id: x become new index in higher layer // it extract the id to higer JS-obj layer, then setting the val as new index wihin higher scope of JS-obj, 
      return {
        ...a, // ...a is passed inside newObj, then the newObj get key by: [extractor-code] as string
        [(item[key] as unknown) as string]: newObj, //key [extracted ID from init JS-obj] as string : key of newObj (in which ...a (accumulated fields only of foo ...spread, id in this layer was delet (see l. 33) paste in )) => => thus [] as string (mean the extraced ID) becomes the key of newOjb
      };//as stirng set then the new id in higher layer of JS-obj
    }, {}); // cb(=arrowFunc)::=> reducer(() => {}, {}==init values)
  }
  
  console.log(
    groupByID(
      [
        { id: 1, foo: 1 },
        { id: 2, foo: 2 },
      ],
      "id"
    )
  );
  //OUTPUT: { '1': { foo: 1 }, '2': { foo: 2 } } // thus extractin the id:




  //utlity types 2

  //most generics function type when assgined it to T, that will produce func
  //<T extends (...args:any[]) => any> //any args input output any


  type Name = { first: string; last: string };

function addFullName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}
                            //T = func (here: addFullName)
function permuteJSONRows<T extends (...args: any[]) => any>(
  iteratorFunc: T, //tyes are func thuse the <T xetends (...args:any[]) => any>
  data: Parameters<T>[0][] //expect: return array dep on:: data: of Parameters of Type T (passed).then(access the first index) and exectt form it another [array], thus the lone [] at the end
): ReturnType<T>[] { //ReturnType: == Obtain the return type of a function type
  return data.map((data: Parameters<T>[0]) => iteratorFunc(data));
}

const records = permuteJSONRows(addFullName, [ //addFullName is cb() (see l. 63)
  { first: "Jack", last: "Herrington" }, //thus {f-name:x,l-name:y} are apsseds into cd() then returened, all possiable by premuteJSONRows<>
  { first: "Mimi", last: "Herrington" },
]);

console.log(records);

//                              // type = T, data: func<T> of T, picking the 0th elem of array, since []
// function createObject<T>(ObjectType: T, data: ConstructorParameter<T>[0][]) : InstaceType<T>
                                                                    //constrcotParamet create InstacneType<T> of T, that why the ffunc createObjects will return the ():InstanceType<T>  
// the same is below here: only to fulfull the constreains, since it is constructor of class need T to extends (=T be assiaingable) to new(...args: any[]) => any>
                        //any func can by craeate/constured
function createObjects<T extends new (...args: any[]) => any>( //new needed since, calling ConstructorParametes invloces meddeling with Classes taht why //new cuz: => Type 'T' does not satisfy the constraint 'abstract new (...args: any) => any'., since "new" mandatory, also cuz it call a Construct,
  ObjectType: T, //passes obj at beginnen, thus remain laters also => mean T becomes obj, infered
  data: ConstructorParameters<T>[0][] //__init vals assgined, and ConstructorParameters due to that class is passed in createOjbect(Class:PersonRecord, data)
): InstanceType<T>[] { //InstaceType is retrued by ConstructorParameters
  return data.map((data: ConstructorParameters<T>[0]) => new ObjectType(data)); //thus the __init vals becoems data, the same data are the props of newly crated obj by new ObjectType(data), data == ConstructorParameters<T>[0] T=passed Obj,[0]=first index beocme name since public construcot only owns one __init val (the passed dtata becomes elem. of obj) which now, due to gerneic preformece is "name":{first,last attr} DONE!
}

class PersonRecord {
  constructor(public name: { first: string; last: string }) {} //__init val and key(=name) public
  get fullName():string { //MEHTODS
    return `${this.name.first} ${this.name.last}`;
  }
}

//data is apsses inside a class (PersonRecord) with __init vals of name as (id-like) sub __init val first, last //see l.97
//personat reacord == objextType T =°, dtat: {first, last}
const objs = createObjects(PersonRecord, [
  { first: "Jack", last: "Herrington" },
  { first: "Mimi", last: "Herrington" },
]);


console.log("Test:  ",  objs)
console.log(objs.map((o) => o.fullName)); //ojbect is deconsturcted into an array, cuz map((o)=>{})
console.log("Test: after Func: ", typeof objs)
console.log()
