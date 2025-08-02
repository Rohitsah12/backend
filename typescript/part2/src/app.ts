let a:number=10;

// Non Primitive Data types

let arr:number[]=[2,4,5,7,11];
let arr2=[2,1,19,10]

let arr3:(string | number | boolean)[]=["Rohit",20,11,"Sohan"]
arr3.push(true);

let arr4:(string| number| boolean)[]=["Rohit",10]

let obj1:{name:string,age:number,gender:string}={
    name:"Rohit",
    age:20,
    gender:"Female"
}

type customer={
    name:string,
    age:number,
    id:string
}

let c1:customer={
    name:"Rohit",
    age:20,
    id:"fdsdfe"
}

interface admin{
    name:string,
    age:number,
    position:string,
}

interface admin{
    id:number
}
let obj3:admin={
    name:"Rohit",
    age:20,
    position:"manager",
    id:1,
}