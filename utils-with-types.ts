interface MyUser {
    name: string;
    id: number;
    email?: string;
  }
  
  type MyUserOptionals = Partial<MyUser>;
  
  const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => { //overrides: by whicht set should the MyUser be overwriter bzw. merrged together
    return {
      ...user, //both mergin together
      ...overrides,
    };
  };
  
  console.log(
    merge(
      {
        name: "Jack",
        id: 2,
        email: "dontemail@dontemail.com",
      },
      {
        email: "dontemailbaz@dontemail.com", //this field will overwriet he previous one, should furhet be added those will be include as well
      }
    )
  );
  
  type RequiredMyUser = Required<MyUser>;
  
  //both practially the same, join. disjuct thing thats math
  type JustEmailAndName = Pick<MyUser, "email" | "name" >; //ematil is defined a optioanl in interface
  type UserWithoutID = Omit<MyUser, "id">;
  


  const mapById = (users: MyUser[]): Record<MyUser["id"], UserWithoutID> => { // the func work very the likely like in file utilis.ts (the first part)
    return users.reduce((a, v) => { //a accumlates the merge/change (only convetinnaly, not hard definedcoded), v passed parameters thus it will adjust, causing change
      const { id, ...other } = v; //v the passed obj (l.46-55)
      return {
        ...a,
        [id]: other,
      };
    }, {});
  };
  
  console.log( //again is it extractio the id into uppgar  layer, and then making it the KEY of the obj itself, 
    mapById([ //passed obj entsp. v in func above, able due to generecity of func 
      {
        id: 1,
        name: "Mr. Foo",
      },
      {
        id: 2,
        name: "Mrs. Baz",
      },
    ])
  );
  