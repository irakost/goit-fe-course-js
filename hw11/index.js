'use strict';
/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  Есть массив объектов (дальше в задании), каждый из которых описывает
  ноутбук с определенными характеристиками.
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам.
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
  После чего выберите из массива только те объекты, которые подходят
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается,
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/
const laptops = [
    {
        size: 13,
        color: 'white',
        price: 28000,
        release_date: 2015,
        name: 'Macbook Air White 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'gray',
        price: 32000,
        release_date: 2016,
        name: 'Macbook Air Gray 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'black',
        price: 35000,
        release_date: 2017,
        name: 'Macbook Air Black 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'white',
        price: 45000,
        release_date: 2015,
        name: 'Macbook Air White 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'gray',
        price: 55000,
        release_date: 2016,
        name: 'Macbook Pro Gray 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'black',
        price: 45000,
        release_date: 2017,
        name: 'Macbook Pro Black 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'white',
        price: 65000,
        release_date: 2015,
        name: 'Macbook Air White 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'gray',
        price: 75000,
        release_date: 2016,
        name: 'Macbook Pro Gray 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'black',
        price: 80000,
        release_date: 2017,
        name: 'Macbook Pro Black 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
];

const filterForm = document.querySelector('.form.js-form');
filterForm.addEventListener('submit', filterProducts);

const box = document.querySelector('#content-part');
const source = document.querySelector('#product-card').innerHTML.trim();

const template = Handlebars.compile(source);
//const markup = template(laptops[1]);


function filterProducts() {
    event.preventDefault();
    getFilters(event);
   let  filter = getFilters();
   let renderData = applyFilter(filter);
   console.log(renderData)
    let markup = template(renderData);
    box.innerHTML = markup;
}
function getFilters() {
    const filter = { size: [], color: [], release_date: [] };


    let checkedSize = null;
    let inputElementsSize = document.getElementsByClassName('size-checkbox');
    let sizes = filter.size;
    for(let i=0; inputElementsSize[i]; ++i){
        if(inputElementsSize[i].checked){
            checkedSize = inputElementsSize[i].value;
            sizes.push(checkedSize);

        }
    }

    let checkedColor = null;
    let inputElementsColor = document.getElementsByClassName('color-checkbox');
    let colors = filter.color;
    for(let i=0; inputElementsColor[i]; ++i){
        if(inputElementsColor[i].checked){
            checkedColor = inputElementsColor[i].value;
            colors.push(checkedColor);

        }
    }

    let checkedRd = null;
    let inputElementsRd = document.getElementsByClassName('rd-checkbox');
    let rdates = filter.release_date;
    for(let i=0; inputElementsRd[i]; ++i){
        if(inputElementsRd[i].checked){
            checkedRd = inputElementsRd[i].value;
            rdates.push(checkedRd);

        }
    }
    return filter;

}

function applyFilter(filter) {

    //Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
    //    Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    //const filter = { size: [10, 12, 16], color: [red, green, blue], release_date: [2010, 2011, 2012] }
    let combinations = {};
    let counter = 0;
    combinations[counter] = {};
    let fs;
    let fc;
    let frd;
    let combination;
    filter.size.length === 0 ? fs = 1 : fs = filter.size.length;
    filter.color.length === 0 ? fc = 1 : fc = filter.color.length;
    filter.release_date.length === 0 ? frd = 1 : frd = filter.release_date.length;
    for (let i = 0; i < fs; i++ ){
        for(let x = 0; x < fc; x++){
            for  (let y = 0; y < frd; y++){
                combinations[counter] = {};
                combinations[counter].size = filter.size[i];
                combinations[counter].release_date = filter.release_date[y];
                combinations[counter].color = filter.color[x];

                counter++;
            }
        }
    }

console.log(combinations);

        let filterdData = {};
        filterdData.computers = [];
        laptops.forEach(function (item, i, arr) {

            for (combination in combinations) {
                if (((item.size === parseInt(combinations[combination].size)) || combinations[combination].size === undefined)
                    && ((item.color === combinations[combination].color) || combinations[combination].color === undefined)
                    && ((item.release_date === parseInt(combinations[combination].release_date)) || combinations[combination].release_date=== undefined)) {
                    filterdData.computers.push(item)


                }

            }
        });
    return filterdData
}