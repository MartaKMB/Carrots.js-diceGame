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
let counter = 0;

const div_sum_a = document.querySelector('#sum_a');
const div_sum_b = document.querySelector('#sum_b');

const span_player_points = document.querySelector('#player_points');
const span_computer_points = document.querySelector('#computer_points');
let computer_points = 0;
let player_points = 0;

const btn_throw = document.querySelector('#btn_throw');

// first throw
const div_dice_1_1 = document.querySelector('#dice_1_1');
const div_dice_2_1 = document.querySelector('#dice_2_1');
const div_dice_3_1 = document.querySelector('#dice_3_1');

// message about decision
const div_comp_msg = document.querySelector('#comp_msg')

//second throw
const div_dice_1_2 = document.querySelector('#dice_1_2');
const div_dice_2_2 = document.querySelector('#dice_2_2');
const div_dice_3_2 = document.querySelector('#dice_3_2');


const btn_check = document.querySelector('#btn_check');
const radio_bigger = document.querySelector('#bigger');
const radio_lower = document.querySelector('#lower');


function playerRound(){
    
    if(counter >= 5) return;
    
    counter ++;
    span_round.innerHTML = counter;
    
    
    btn_throw.disabled = false;
    btn_check.disabled = true;
    
    console.log(counter);

    btn_throw.addEventListener('click', randomDiceNumbers(1));
    
    const sum_a = sumDiceNumbers(div_dice_1_1.innerHTML, div_dice_2_1.innerHTML, div_dice_3_1.innerHTML);
    
    div_sum_a.innerHTML = 'pierwszy rzut suma: ' + sum_a;

    const computerDecision = biggerOrLower();
    
    if(computerDecision === true) {
        div_comp_msg.innerHTML= computerDecision + ' suma oczek z kolejnego rzutu będzie większa';
    } else {
        div_comp_msg.innerHTML= computerDecision + ' suma oczek z kolejnego rzutu będzie mniejsza';
    }
    
    
        
    const secondThrow = randomDiceNumbers(2);
    btn_throw.addEventListener('click', randomDiceNumbers(2));
    
    const sum_b = sumDiceNumbers(div_dice_1_2.innerHTML, div_dice_2_2.innerHTML, div_dice_3_2.innerHTML);
    
    div_sum_b.innerHTML = 'drugi rzut suma: ' + sum_b;
    
    // false: next sum will be lower; true: next sum will be bigger
    
    if(computerDecision === true && sum_b > sum_a) {
        console.log(computerDecision + ' komputer miał rację suma oczek z drugiego rzutu jest większa');
        computer_points++;
        span_computer_points.innerHTML = computer_points;
    } else if(computerDecision === true && sum_b < sum_a) {
        console.log(computerDecision + ' komputer NIE miał racji suma oczek z drugiego rzutu jest mniejsza');
        player_points++;
        span_player_points.innerHTML = player_points;
    } else if(computerDecision === false && sum_b < sum_a) {
        console.log(computerDecision + ' komputer miał rację suma oczek z drugiego rzutu jest mniejsza');
        computer_points++;
        span_computer_points.innerHTML = computer_points;
    } else if(computerDecision === false && sum_b > sum_a) {
        console.log(computerDecision + ' komputer NIE miał racji suma oczek z drugiego rzutu jest większa');
        player_points++;
        span_player_points.innerHTML = player_points;
    } else {
        console.log('może sumy są takie same, albo coś poszło nie tak');
    }

    
}


btn_start.addEventListener('click', (e) => {

    // start_view.setAttribute( 'class', 'invisible' );
//    span_round.innerHTML = counter;

//    if (span_first_player.innerHTML === 'komputer') {
//
//        randomDiceNumbers();
//        sum_b = sumDiceNumbers(div_dice_1.innerHTML, div_dice_2.innerHTML, div_dice_3.innerHTML);
//        btn_throw.disabled = true; 
//        btn_check.disabled = false;
//    } else {
//        
//            playerRound();
        
        
//    }
    span_round.innerHTML = 1;
    span_player_points.innerHTML = player_points;
    span_computer_points.innerHTML = computer_points;

});

function throwFunction() {
//    if(counter > 10) return;
//    
//    span_round.innerHTML = Math.floor(counter/2);
//    counter ++;
    
//    randomDiceNumbers();
    
//    const sum_a = sumDiceNumbers(div_dice_1.innerHTML, div_dice_2.innerHTML, div_dice_3.innerHTML);
//    
//    return sum_a;
}

btn_throw.addEventListener('click', playerRound);


function clickCheck() {
    if(bigger.checked === true) {
        document.querySelector('#test').innerHTML = 'większy';
    } else if (lower.checked === true) {
        document.querySelector('#test').innerHTML = 'mniejszy';
    } else {
        document.querySelector('#test').innerHTML = 'dziwadła dziwadełka';
    }
    
    const dice_value_1 = div_dice_1.innerHTML;
    const dice_value_2 = div_dice_2.innerHTML;
    const dice_value_3 = div_dice_3.innerHTML;

    sum_a = sumDiceNumbers(dice_value_1, dice_value_2, dice_value_3);
}

btn_check.addEventListener('click', clickCheck);


function randomNumber() {
    let random_nr = Math.floor((Math.random() * 6) + 1);
    return random_nr;
}

function randomDiceNumbers(round) {
    if(round == 1) {
        div_dice_1_1.innerHTML = randomNumber();
        div_dice_2_1.innerHTML = randomNumber();
        div_dice_3_1.innerHTML = randomNumber();
    } else if(round == 2) {
        div_dice_1_2.innerHTML = randomNumber();
        div_dice_2_2.innerHTML = randomNumber();
        div_dice_3_2.innerHTML = randomNumber();
    } else {
        console.log('coś poszło nie tak - funkcja randomDiceNumbers(round)');
    }
    
}

function sumDiceNumbers(a, b, c) {
    return parseInt(a) + parseInt(b) + parseInt(c);
}

function biggerOrLower() {
    let decision = Math.floor((Math.random() * 2) + 1);
    if(decision === 1) {
        return true;
    } else {
        return false;
    }
}
