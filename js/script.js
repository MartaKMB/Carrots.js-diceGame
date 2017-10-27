const btn_first_player = document.querySelector('#btn_first_player');
const span_first_player = document.querySelector('#first_player_name');

const btn_start = document.querySelector('#btn_start');
const start_view = document.querySelector('#container_start');

btn_first_player.addEventListener('click', (e) => {
    let player_name = document.querySelector('#input_name').value;

    let draw_num = Math.round(Math.random());

    if (player_name === '') {
        player_name = 'Tajemniczy Gość';
    }

    if (draw_num === 0) {
        span_first_player.innerHTML = player_name;
    } else {
        span_first_player.innerHTML = 'komputer';
    }

});

const span_round = document.querySelector('#round');
let counter = 1;

const btn_throw = document.querySelector('#btn_throw');

const div_dice_1 = document.querySelector('#dice_1');
const div_dice_2 = document.querySelector('#dice_2');
const div_dice_3 = document.querySelector('#dice_3');

let sum_a = 0;
let checkBiggerLower = true;
const btn_bigger = document.querySelector('#btn_bigger');
const btn_lower = document.querySelector('#btn_lower');


btn_start.addEventListener('click', (e) => {

    // start_view.setAttribute( 'class', 'invisible' );
    span_round.innerHTML = counter;

    if (span_first_player.innerHTML === 'komputer') {

        randomDiceNumbers();

        //      btn_throw.disabled = true;
    } else {
        //      btn_throw.disabled = false;
    }

});

btn_throw.addEventListener('click', (e) => {

    span_round.innerHTML = counter;
    counter++;

    const dice_value_1 = randomDiceNumber();
    const dice_value_2 = randomDiceNumber();
    const dice_value_3 = randomDiceNumber();

    div_dice_1.innerHTML = dice_value_1;
    div_dice_2.innerHTML = dice_value_2;
    div_dice_3.innerHTML = dice_value_3;

    const sum_b = sumDiceNumbers(dice_value_1, dice_value_2, dice_value_3);

    if (sum_a !== 0) {
        if (sum_a < sum_b && checkBiggerLower === true) {
            document.querySelector('#test').innerHTML = sum_b + ' ta jest większa od poprzedniej ' + sum_a + ' i tak kliknąłeś';
        } else if (sum_a < sum_b && checkBiggerLower === false) {
            document.querySelector('#test').innerHTML = sum_b + ' ta jest większa od poprzedniej ' + sum_a + ' i tak NIE kliknąłeś - kliknąłeś, że będzie mniejsza';
        } else if (sum_a > sum_b && checkBiggerLower === false) {
            document.querySelector('#test').innerHTML = sum_a + ' poprzednia jest większa ' + sum_b + ' i tak kliknąłeś';
        } else if (sum_a > sum_b && checkBiggerLower === true) {
            document.querySelector('#test').innerHTML = sum_a + ' poprzednia jest większa ' + sum_b + ' i tak NIE kliknąłeś - kliknąłeś, że będzie większa';
        }

    } else {
        document.querySelector('#test').innerHTML = 'nie ma sumy do której można porównać';
    }

});

btn_bigger.addEventListener('click', (e) => {

    const dice_value_1 = div_dice_1.innerHTML;
    const dice_value_2 = div_dice_2.innerHTML;
    const dice_value_3 = div_dice_3.innerHTML;

    sum_a = sumDiceNumbers(dice_value_1, dice_value_2, dice_value_3);

    checkBiggerLower = true;

});

btn_lower.addEventListener('click', (e) => {

    const dice_value_1 = div_dice_1.innerHTML;
    const dice_value_2 = div_dice_2.innerHTML;
    const dice_value_3 = div_dice_3.innerHTML;

    sum_a = sumDiceNumbers(dice_value_1, dice_value_2, dice_value_3);

    checkBiggerLower = false;

});

function randomNumber() {
    let random_nr = Math.floor((Math.random() * 6) + 1);
    return random_nr;
}

function randomDiceNumbers() {
    div_dice_1.innerHTML = randomNumber();
    div_dice_2.innerHTML = randomNumber();
    div_dice_3.innerHTML = randomNumber();
}

function sumDiceNumbers(a, b, c) {
    return parseInt(a) + parseInt(b) + parseInt(c);
}
