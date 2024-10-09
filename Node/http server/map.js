function map(arr, fn){
    const transformedArr = [];
    for(let i = 0; i < arr.length; i++){
        transformedArr.push(fn(arr[i]));
    }
    return transformedArr;
}

const arr = [2, 4, 6, 8, 10];

function square(n) {
    return n ** 2;
}

const ans = map(arr, square);
console.log(ans);