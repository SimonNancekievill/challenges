import { validateHeaderName } from "node:http";

function first(arr: any) {
  return arr[0];
}
// Its an O(1) complexity class because, its a direct output. Fixed position. one possible answer.

function second(arr: any) {
  let total = 0;
  for (const value of arr) {
    total += value;
  }
  return total;
}
// Its an 0(n) complexitiy class because, each value is counted and added once I guess?

function third(arr: any) {
  for (const a of arr) {
    for (const b of arr) {
      if (a === b) console.log(a);
    }
  }
}

// O(n^2) maybe because its a nested loop and first need to go over the arr then again for b

function fourth(arr: any) {
  for (const value of arr) {
    for (let i = 0; i < 10; i++) {
      console.log(value, 1);
    }
  }
}
