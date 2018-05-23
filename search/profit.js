'use strict'

const sharePrices = [128, 97, 121, 123, 98, 97, 105]

function profit(arr) {
  let lowestPrice = arr[0];
  let maxProfit = arr[1] - lowestPrice;
  for(let i = 1; i < arr.length; i++){
    if(arr[i] < lowestPrice){
      lowestPrice = arr[i]
    }
    if (maxProfit < arr[i] - lowestPrice){
      maxProfit = arr[i] - lowestPrice
    }
  }
  return maxProfit
}

console.log(profit(sharePrices))
