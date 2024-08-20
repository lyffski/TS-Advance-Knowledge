// interface Database {
//     get(id: string): string;
//     set(id: string, value: string): void;
//   }
  
//   interface Persistable {
//     saveToString(): string;
//     restoreFromString(storedState: string): void;
//   }
  
//   class InMemoryDatabase implements Database {
//     protected db: Record<string, string> = {};
//     get(id: string): string {
//       return this.db[id];
//     }
//     set(id: string, value: string): void {
//       this.db[id] = value;
//     }
//   }
  
//   class PersistentMemoryDB extends InMemoryDatabase implements Persistable {
//     saveToString(): string {
//       return JSON.stringify(this.db);
//     }
//     restoreFromString(storedState: string): void {
//       this.db = JSON.parse(storedState);
//     }
//   }
  
//   const myDB = new PersistentMemoryDB(); //crate obj
//   myDB.set("foo", "bar"); //set obj w/ vals
//   const saved = myDB.saveToString(); //save curr obj props
//   // myDB.db["foo"] = "baz"; // cuz procted/privete
//   console.log(myDB.get("foo")); //retreive the obj with key "foo" from myDB 
  
//   myDB.set("foo", "db1 - bar"); //re-set obj "foo" with new val
  
//   const myDB2 = new PersistentMemoryDB(); //cratre sec. obj of new deriverd class DB into presitseMemoDB
//   myDB2.restoreFromString(saved); //resotred the saved obj fo l.32
//   console.log(myDB2.get("foo")); //reterive the ojb "foo" from obj myDB2 from class PresistentMemoryDB class


// // ##################################################
//   // DB with generic Key (K) and Value (T) /type
// // ##################################################



// ##################################################
  // DB with generic Key (K) and Value (T) /type
// ##################################################

interface Database<T, K> { //super interface (id (PK) value dep. on id) id : {value}
  get(id: K): T; //return the T type, mean what is saved under K as T (T is passed in func call, thence genreci, thats why the func as it is defined do not konw which type/strcut it wil lget)
  set(id: K, value: T): void; //set return void, since it onyl displaying
}

interface Persistable { 
  saveToString(): string; // saveToStirng == eempty memo. space that porpuse is to be saved under, thus return string, sicne the passes type may be cased into string eventuly
  restoreFromString(storedState: string): void; //like imagine to migrate data, raw "string" key will be def in new class, then to miraate a savedString == here data func needed to restore the entry(), return void, sicne it only put the entry in db, do not return nothing
}

type DBKeyType = string | number | symbol; //K my be str int sym

class InMemoryDatabase<T, K extends DBKeyType> implements Database<T, K> { //super class of DB, where T == (passed type/obj as arg from invokeing func) Key, curr Class implemtns Database interface, where T:type to store / K:key to access
  protected db: Record<K, T> = {} as Record<K, T>; //db only accessed by chidren of class, db = initState {empty array}, yet recored as Record<K, T> where K:key to access, THO NOTE: val "key/id" is derivecd form passes T:types/obj thats why K must be accessed by props from T, since T owns an ID => thus ID-field of T becomes the K:key(here: ID) to accessable/reference like making a unique poineter as K into T:obj/type in this class 
  get(id: K): T { //return T (sicne displaying the T), since T is the acutly vals/props of passed T:type, accesesd by K:key(id) etc//override the superemehod of get, with now adjusted T and K
    return this.db[id]; // acutaly preforema of get method, how to handle those reqeust, NOTE implementaionc/code may vary dep. on the complexitex of the passed T:type obj itself, (here it is simple example)
  }
  set(id: K, value: T): void { //return void, since it only re-set/set, by accessing the K of curr obj, to new value passed, NOTE: value args, MUST BE IN TYPES of orirign T, hence value: T, to have the same format of data
    this.db[id] = value; //reseting the value of T, still in T:type struct etc
  }
}

class PersistentMemoryDB<T, K extends DBKeyType>
  extends InMemoryDatabase<T, K> //those T, K are the same as the boforehanded assinged in PresistenMemoryDB<T, K> above line
  implements Persistable {

  //methods (): return //NOTE getter and setter func are inherieted
  saveToString(): string { 
    return JSON.stringify(this.db); //.db derived from class InMemoryDatabase::protected db: Record<K,T> // note in Recored<K,T> the order of args change JUST NOTE, alwys see desc of the func in VSC
  }

    //return void, sicne it onyl updataing it in the new DB
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new PersistentMemoryDB<number, string>();
myDB.set("foo", 22);
// myDB.db["foo"] = "baz";
console.log(myDB.get("foo"));
const saved = myDB.saveToString(); 

console.log(typeof saved) //it prrints string, since in func saveToString() it was returned as JSON.stringy(this.db) this.db curr obj, now beocmes string, due to JSON/and stringfly()
//string
console.log( saved) //is string see above (due to JSON.stringfy(this.db)) this.obj so to say
//{"foo":22}

myDB.set("foo", 23);
console.log(myDB.get("foo"));

myDB.set("boo", 233);
console.log(myDB.get("boo"));

const myDB2 = new PersistentMemoryDB<number, string>();
myDB2.restoreFromString(saved);
console.log(myDB2.get("foo")); //"boo" not def in myDB2 o




  
  