import { TimeDecend } from './timeDecend.js'

document.addEventListener("DOMContentLoaded", function() {
    const time = new TimeDecend('10/18/2022 11:20:00');
    //const time = new TimeDecend('10/19/2021 11:20:00');
    //const time = new TimeDecend('17/10/2021 18:42:00');
    new TimeDecend('10/18/2021 13:23:00', {//http://localhost/time-decend/
        container: '.lg--clock-descend-2',
        //redirectAfterFinishing: 'https://developer.mozilla.org/es/docs/Web/CSS/box-shadow',
        messageAfterFinishing: 'Mi mensaje',
        waitingTime:  10000,
        timeBeforeRedirecting:  5000,
    });
});