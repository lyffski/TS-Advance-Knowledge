function pluck<DataType, KeyType extends keyof DataType>( // inside <{here}> generics are defined, and must be infered by the func/or its parameters etc 
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: "Mimi", age: 12 },
  { name: "LG", age: 13 },
];

//infereed
console.log(pluck(dogs, "age"));//return type infered number[], thus all the ages of dogs in dogs const of name:field
console.log(pluck(dogs, "name")) //return type infered stirng[], thus al lthe ages of dogs in dogs const of age:field



interface BaseEvent {
  time: number;
  user: string;
}
interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string }; //due to interface, fields must be accessed via "STRING" "name_of_field" == "addToCart"
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>( // Name is gereric, thus assainb freely
  name: Name, //name derivered/assigned from EventMap => name: Name == one of the key, hence extends keyof Eventmap, of EventMap
  data: EventMap[Name] //name assigend (here: the keyof Eventmap called) addToCart/checkout => EventMap (see interface), Eventmap[Name==addToCard or checkout], (LIKE in Python-dics) due to DIC => it entry the assigeind Data of key
): void { 
  console.log([name, data]);
}

const Namee="asd"

sendEvent("addToCart", {
  productID: "foo",
  user: "baz",
  quantity: 1,
  time: 10,
});
sendEvent("checkout", { time: 20, user: "bob" });

sendEvent("addToCart", {time: 20, user: "hal", "quantity": 20, productID: "kk"}) //props can be access either by "stirg" or as props_name

sendEvent("checkout", {time: 10, user: "hali"})



//sendEvent<typeof Namee extends keyof EventMap>(null, {null:null})
//infered Gererics, when invocked sendEvent() with assiged "addToCart" event from EventMap etc

//function sendEvent<"addToCart">(name: "addToCart", data: BaseEvent & {
//  quantity: number;
//  productID: string;
//}): void
