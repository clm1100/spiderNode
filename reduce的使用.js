// var arr = [1, 2, 3, 4, 5, [3, 4, 5, [3, 4, 5, 6], [3, 4, 5, 6]]]

// function fllten(arr) {
//     return arr.reduce((a, b) => {
//         if (Array.isArray(b)) {
//             return a.concat(fllten(b))
//         }
//         return a.concat(b)
//     }, [])
// }

// let res = fllten(arr);
// console.log(res);


function chained1(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
// var t = chained1(function(x){return 2*x},function(x){return 5*x})(100)
// console.log(t)
function chained2(funcs) {
    return function (input) {
        return funcs.reduce(function (input, fn) {
            return fn(input)
        }, input);
    }
}





// var r = [function(x){return 2*x},function(x){return 2*x},function(x){return 2*x},function(x){return 5*x}].reduce((a,b)=>{
//     return (t)=>{
//        return a(b(t))
//     }
// })(10,30);


var arrfn = [function(x){return 2*x},function(x){return 2*x},function(x){return 2*x},function(x){return 5*x}]

// console.log(r);


// function chaaint(fns){
//     return function(input){
//          return fns.reduce(function(input,fn){
//              return fn(input);
//          },input)
//     }
// }
// function chaaint(fns){
//     return function(input){
//         return fns.reduce(function(pre,curr){
//             return curr(pre)
//         },input)
//     }
// }

// function chaaint(fns){
//     return fns.reduce((a,b)=>()=>)
// }


// var t2 = chaaint(arrfn)(100);
// console.log(t2)


var rr = arrfn.reduce(function(a,b){
    return function(arg){
        return b(a(arg))
    }
}) 
console.log(rr.toString());
var rrr = rr(100);
console.log(rrr)


var tyri = function (arg){
    return b(a(arg))
}