'use strict';
/*
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок.
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике
      на кнопку происходит удаление.
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
  🔔 Оформление интерфейса произвольное
*/
const form = document.querySelector('.sbm-form');
const input = document.querySelector('.input-value');
const listLinks = document.querySelector(".list-links");
const localStorage = window.localStorage;
form.addEventListener("submit", pushLink);
let links = (localStorage.getItem('links')) ? localStorage.getItem('links').split(",") : [];
compileHTML(links);

function pushLink() {
    event.preventDefault();
    let link = input.value;
    let flag = true;
    links.forEach((elem) => {
        if(elem == link) {
            alert("Існує");
            flag = false;
        }
    });
    if(flag) {
        links.unshift(link);
        localStorage.setItem('links', links.join());
        input.value = null;
        compileHTML(links);
    }
}

function compileHTML(list) {
    const source = '{{#each links}}<p>{{this}}</p>{{/each}}';
    const template = Handlebars.compile(source);
    listLinks.innerHTML = template({"links": list});
}