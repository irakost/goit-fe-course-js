'use strict';

let show = prompt('enter namber!');
console.log(typeof(show));
let showNumber = Number(show);
console.log(typeof(showNumber));

let password = 'password';

if (show === password){
    let login = prompt('enter login')
    if (login ==='Maksim'){
        alert('Ok its me!!')
    } else {
        alert('its not me!))))')
    }
}else{
    alert('enterlogin!!!!!')
}


