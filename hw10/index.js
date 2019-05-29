'use strict';

/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const getBtn = document.querySelector('.get-btn');
const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.delete-btn');
const updateBtn = document.querySelector('.up-btn');
const API_URL = "https://test-users-api.herokuapp.com/users/";

getBtn.addEventListener('click',actionSelector);
addBtn.addEventListener('click',actionSelector);
deleteBtn.addEventListener('click',actionSelector);
updateBtn.addEventListener('click',actionSelector);

function actionSelector(event){
    event.preventDefault();
    let idField = document.querySelector("#idField");
    let idFieldValue = idField.value;
    let idName = document.querySelector('#idName');
    let idNameValue = idName.value;
    let idAge = document.querySelector('#idAge');
    let idAgeValue = idAge.value;


    switch (event.target.id){
        case "get":
            idFieldValue === "" ? getAllUsers() : getUserById(idFieldValue);
        break;
        case  "add":
            addUser(idNameValue, idAgeValue);
        break;
        case "delete":
            removeUser(idFieldValue);
        break;
        case "update":
            let user = {
                name: idNameValue,
                age: idAgeValue,
                id: idFieldValue
            };
            updateUser(idFieldValue, user );
        break;
    }

}

function getAllUsers() {
    fetch(API_URL, {
        method: 'get'
    })
        .then(response => {
            if(response.ok) return response.json();
            throw new Error (`Error: ${response.statusText}`);
        })
        .then (response => printResults(response, "all"))
        .catch(err => {
        console.error("Error: ", err);
        })
}


function getUserById(idFieldValue) {
    fetch(API_URL + idFieldValue, {
        method: 'get'
    })
        .then(response => {
            if(response.ok) return response.json();
            throw new Error (`Error: ${response.statusText}`);
        })
        .then (response => printResults(response, "single"))
        .catch(err =>
            console.error("Error: ", err)
        )
}

function addUser(idNameValue, idAgeValue) {
    console.log(event)
    fetch(API_URL, {
        method: 'post',
        body: JSON.stringify({ name: idNameValue, age: idAgeValue}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            console.log(response)
            if(response.ok) return response.json();
            throw new Error (`Error: ${response.statusText}`);
        })
        .then (response => printResults(response))
        .catch(err => {
            console.error("Error: ", err);
        })

}

function removeUser(idFieldValue) {
    fetch(API_URL + idFieldValue, {
        method: 'delete',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if(response.ok) return response.json();
            throw new Error (`Error: ${response.statusText}`);
        })
        .then (response => printResultsDelete(response))
        .catch(err => {
            console.error("Error: ", err);
        })
}



function updateUser(idFieldValue, user ) {
    fetch(API_URL + idFieldValue, {
        method: 'put',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if(response.ok) return response.json();
            throw new Error (`Error: ${response.statusText}`);
        })
        .then (response => printResultsUpdate(response))
        .catch(err => {
            console.error("Error: ", err);
        })
}

function printResultsDelete(results) {
    let usersResult = document.querySelector('.result');
    console.log(results)
    if (results.status === 200) {
        usersResult.innerHTML = "deleted"
    }
    if (results.status === 404) {
        usersResult.innerHTML = "Check data"
    }
}

function printResultsUpdate(results) {
    let usersResult = document.querySelector('.result');
    console.log(results)
    if (results.status === 200) {
        var dataForRender;
        dataForRender = " id: " + results.data.id + " name: " + results.data.name + " age: " + results.data.age + "</br>" ;
    }

    if (results.status === 404) {
        dataForRender = "Check data"
    }

    usersResult.innerHTML = dataForRender

}

function printResults(results, amount) {
    let usersResult = document.querySelector('.result');
    console.log(results)
    if (results.status === 200) {
        let data = JSON.stringify(results.data);
        let dataForRender = "";

        if (amount === "all"){
            for( let key in results.data){
                dataForRender = dataForRender + " id: " + results.data[key].id + " name: " + results.data[key].name + " age: " + results.data[key].age + "</br>" ;
            }
            usersResult.innerHTML = dataForRender
        } else {
            dataForRender = dataForRender + " id: " + results.data.id + " name: " + results.data.name + " age: " + results.data.age + "</br>" ;
            usersResult.innerHTML = dataForRender
        }


    }
    if (results.status === 201) {
        //let data = JSON.stringify(results.data);
        //let usersResult = document.querySelector('.result');
        let dataForRender = "";
        dataForRender =  dataForRender + " id: " + results.data["_id"] + " name: " + results.data.name + " age: " + results.data.age + "</br>" ;
        console.log(results.data)
        for( let key in results){
            //console.log(key.data)
            //dataForRender =  dataForRender + " id: " + results.data.id + " name: " + results.data.name + " age: " + results.data.age + "</br>" ;
        }
        usersResult.innerHTML =dataForRender;
    }

    if (results.status === 500) {
        let data = JSON.stringify(results.errors[0]);
        let usersResult = document.querySelector('.result');
        usersResult.innerHTML = data
    }


}