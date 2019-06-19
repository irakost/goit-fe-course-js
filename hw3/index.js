'use strict';

const allLogins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];
const login = prompt('введите логин');
const isLoginValid = function(login) {
    return login.length >= 4 && login.length <= 16;
  };
  
  const isLoginUnique = function(allLogins, login) {
    return !allLogins.includes(login);
  };



  
  const addLogin = function(allLogins, login) {
   if (isLoginValid(login)){
    if(isLoginUnique(allLogins, login)){
        allLogins.push(login);
        console.log('Логин успешно добавлен!');
    } else {
        console.log('Такой логин уже используется!');
    }
} else{
    console.log('Ошибка! Логин должен быть от 4 до 16 символов');
}
   };
   addLogin(allLogins, login);
 console.log(allLogins);



//   // Вызовы функции для проверки
// addLogin('Ajax'); // 'Логин успешно добавлен!'
// addLogin('robotGoogles'); // 'Такой логин уже используется!'
// addLogin('Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
// addLogin('jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 