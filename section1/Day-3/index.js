let a=10;
let b="Hello ji"

function sum(a,b){
    return(a+b);
}

setTimeout(()=>{ //libuv ko lakrr de dega
    console.log("Hello timeout");
    
},3000);

console.log(a);
console.log(sum(3,8));

