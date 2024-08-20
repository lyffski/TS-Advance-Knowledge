//Mixins to add funcionanlyt to classes you may or may not controll

//see Web: Mixins ts
//func creats funcs
//func creates (generics) classesf

//One of the challenges I’ve experienced with TypeScript is the limit on only inheriting or extending from a single class at a time. You can circumvent this constraint, especially in a more complex architecture, by using TypeScript mixins to improve multiple class inheritance.
//Mixins are special classes that contain a combination of methods that can be used by other classes. Mixins promote code reusability and help you avoid limitations associated with multiple inheritance.
//done by interface class extension and declaration merging. provided by TS

// Handling multiple class extension

//Conclusion

//TypeScript mixins come in handy when building applications that are likely to grow in complexity. When building TypeScript applications with complex architecture, you’ll want to extend multiple classes at the same time. With mixins you can overcome the limitations associated with multiple inheritance.
//ref: (see Web: https://blog.logrocket.com/typescript-mixins-examples-and-use-cases/)

function myLogFunction() {
    return (str: string) => {
      console.log(str);
    };
  }
  
  function myLoggerClass() {
    return new (class Logger {
      private completeLog: string = "";
      log(str: string) {
        console.log(str);
        this.completeLog += `${str}\n`;
      }
      dumpLog() {
        return this.completeLog;
      }
    })();
  }
  
  function SimpleMemoryDatabase<T>() {
    return class SimpleMemoryDatabase {
      private db: Record<string, T> = {};
  
      set(id: string, value: T): void {
        this.db[id] = value;
      }
  
      get(id: string): T {
        return this.db[id];
      }
  
      getObject(): Record<string, T> {
        return this.db;
      }
    };
  }
  
  const StringDatabase = SimpleMemoryDatabase<string>();
  
  const sdb1 = new StringDatabase();
  sdb1.set("name", "Jack");
  console.log(sdb1.get("name"));
  
  //the T here must not be extriable the same T as in func Dumpable<T>(), is good thats why Generics
  type Constructor<T> = new (...args: any[]) => T;
  

  function Dumpable<
    T extends Constructor<{
      getObject(): object;
    }>
  >(Base: T) {
    return class Dumpable extends Base {
      dump() {
        console.log(this.getObject());
      }
    };
  }
  
  const DumpableStringDatabase = Dumpable(StringDatabase);
  const sdb2 = new DumpableStringDatabase();
  sdb2.set("name", "Jack");
  sdb2.dump();
  