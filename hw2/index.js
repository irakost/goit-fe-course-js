'use strict';


let userInput;
const numbers = [];

do {
      userInput = Number(prompt("Введите число", ''));
      if(!isNaN(Number(userInput))) {
        numbers.push(Number(userInput));
    } else {
        alert('Было введено не число, попробуйте еще раз');
    }

} while (userInput !== null);

let total = 0;
for(let item of numbers){
    total = total + item;
}
alert(`Общая сумма чисел равна ${total}`);
        