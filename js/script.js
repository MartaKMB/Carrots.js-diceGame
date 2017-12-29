(function startPage() {

    const btn_first_player = document.querySelector('#btn_first_player');
    const span_first_player = document.querySelector('#first_player_name');

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
        
        btn_first_player.disabled = true;
        
    });

}());


(function gamePage() {

    const span_first_player = document.querySelector('#first_player_name');
    const btn_start = document.querySelector('#btn_start');

    let who_first = true; /* start: true - computer, false - user */

    const span_round = document.querySelector('#round');
    let counter = 1;

    const div_sum_a = document.querySelector('#sum_a');
    const div_sum_b = document.querySelector('#sum_b');

    const span_player_points = document.querySelector('#player_points');
    const span_computer_points = document.querySelector('#computer_points');
    let computer_points = 0;
    let player_points = 0;

    const span_winner = document.querySelector('#winner');

    /* first throw */
    const div_dice_1_1 = document.querySelector('#dice_1_1');
    const div_dice_2_1 = document.querySelector('#dice_2_1');
    const div_dice_3_1 = document.querySelector('#dice_3_1');

    /* second throw */
    const div_dice_1_2 = document.querySelector('#dice_1_2');
    const div_dice_2_2 = document.querySelector('#dice_2_2');
    const div_dice_3_2 = document.querySelector('#dice_3_2');

    const btn_bigger = document.querySelector('#bigger');
    const btn_lower = document.querySelector('#lower');

    const div_decision_msg = document.querySelector('#decision_msg')

    const btn_next = document.querySelector('#next_round');

    const dice_array = [div_dice_1_1, div_dice_2_1, div_dice_3_1, div_dice_1_2, div_dice_2_2, div_dice_3_2, div_sum_a, div_sum_b, div_decision_msg];


    function clearGameBoard(array_to_clear) {
        
        for (let i = 0; i < array_to_clear.length; i++) {
            array_to_clear[i].innerHTML = '';
        }
        
    }

    function winner() {
        
        const player_points = parseInt(span_player_points.innerHTML);
        const computer_points = parseInt(span_computer_points.innerHTML);

        clearGameBoard(dice_array);

        btn_bigger.disabled = true;
        btn_lower.disabled = true;
        btn_next.disabled = true;

        if (player_points > computer_points) {
            span_winner.innerHTML = document.querySelector('#input_name').value + ' jesteś zwycięzcą!';
        } else if (computer_points > player_points) {
            span_winner.innerHTML = 'Tym razem komputer wygrał';
        } else {
            span_winner.innerHTML = 'Czyżby remis?';
        }
        
    }

    function randomNumber() {
        
        let random_nr = Math.floor((Math.random() * 6) + 1);
        return random_nr;
        
    }

    function randomDiceNumbers(round) {
        
        if (round == 1) {
            div_dice_1_1.innerHTML = randomNumber();
            div_dice_2_1.innerHTML = randomNumber();
            div_dice_3_1.innerHTML = randomNumber();
        } else if (round == 2) {
            div_dice_1_2.innerHTML = randomNumber();
            div_dice_2_2.innerHTML = randomNumber();
            div_dice_3_2.innerHTML = randomNumber();
        } else {
            console.log('coś poszło nie tak - funkcja randomDiceNumbers');
        }
        
    }

    function sumDiceNumbers(a, b, c) {
        return parseInt(a) + parseInt(b) + parseInt(c);
    }

    function computerRound() {

        btn_bigger.disabled = false;
        btn_lower.disabled = false;

        randomDiceNumbers(1);

        const sum_a = sumDiceNumbers(div_dice_1_1.innerHTML, div_dice_2_1.innerHTML, div_dice_3_1.innerHTML);

        div_sum_a.innerHTML = 'pierwszy rzut suma: ' + sum_a;

        who_first = false;

    }

    function biggerOrLower() {
        
        let decision = Math.floor((Math.random() * 2) + 1);
        
        if (decision === 1) {
            return true;
        } else {
            return false;
        }
        
    }

    function points(player_name, flag_decision) {
        /* flag_decision: false - next sum will be lower; true - next sum will be bigger */

        const sum_a = sumDiceNumbers(div_dice_1_1.innerHTML, div_dice_2_1.innerHTML, div_dice_3_1.innerHTML);

        randomDiceNumbers(2);

        const sum_b = sumDiceNumbers(div_dice_1_2.innerHTML, div_dice_2_2.innerHTML, div_dice_3_2.innerHTML);
        div_sum_b.innerHTML = 'drugi rzut suma: ' + sum_b;

        if (player_name === 'COMPUTER') {

            if (flag_decision === true) {
                div_decision_msg.innerHTML = 'komputer obstawił, że suma oczek w kolejnym rzucie będzie WIĘKSZA';

                if (sum_b > sum_a) {
                    console.log('miał rację suma oczek z drugiego rzutu jest większa!');
                    computer_points++;
                    span_computer_points.innerHTML = computer_points;
                } else if (sum_b < sum_a) {
                    console.log('NIE miał racji suma oczek z drugiego rzutu jest mniejsza');
                    player_points++;
                    span_player_points.innerHTML = player_points;
                } else {
                    console.log('może sumy są takie same?');
                }
            } else if (flag_decision === false) {
                div_decision_msg.innerHTML = 'komputer obstawił, że suma oczek w kolejnym rzucie będzie MNIEJSZA';

                if (sum_b < sum_a) {
                    console.log('miał rację suma oczek z drugiego rzutu jest mniejsza!');
                    computer_points++;
                    span_computer_points.innerHTML = computer_points;
                } else if (sum_b > sum_a) {
                    console.log('NIE miał racji suma oczek z drugiego rzutu jest większa');
                    player_points++;
                    span_player_points.innerHTML = player_points;
                } else {
                    console.log('może sumy są takie same?');
                }
            } else {
                console.log('problem z podjęciem decyzji przez komputer | points');
            }

        } else if (player_name === 'PLAYER') {

            if (flag_decision === true) {
                div_decision_msg.innerHTML = 'obstawiłeś/aś, że suma oczek w kolejnym rzucie będzie WIĘKSZA';

                if (sum_b > sum_a) {
                    console.log('miałeś/aś rację suma oczek z drugiego rzutu jest większa!');
                    player_points++;
                    span_player_points.innerHTML = player_points;
                } else if (sum_b < sum_a) {
                    console.log('NIE miałeś/aś racji suma oczek z drugiego rzutu jest mniejsza');
                    computer_points++;
                    span_computer_points.innerHTML = computer_points;
                } else {
                    console.log('może sumy są takie same?');
                }
            } else if (flag_decision === false) {
                div_decision_msg.innerHTML = 'obstawiłeś/aś, że suma oczek w kolejnym rzucie będzie MNIEJSZA';

                if (sum_b < sum_a) {
                    console.log('miałeś/aś rację suma oczek z drugiego rzutu jest mniejsza!');
                    player_points++;
                    span_player_points.innerHTML = player_points;
                } else if (sum_b > sum_a) {
                    console.log('NIE miałeś/aś racji suma oczek z drugiego rzutu jest większa');
                    computer_points++;
                    span_computer_points.innerHTML = computer_points;
                } else {
                    console.log('może sumy są takie same?');
                }
            } else {
                console.log('problem z podjęciem decyzji przez gracza | function points');
            }

        } else {
            console.log('problem z funkcją points');
        }
        
    }

    function playerDecision(flag_decision) {

        btn_bigger.disabled = true;
        btn_lower.disabled = true;

        points('PLAYER', flag_decision);
        
    }

    function playerDecisionBigger() {
        playerDecision(true);
    }

    function playerDecisionLower() {
        playerDecision(false);
    }

    function playerRound() {

        btn_bigger.disabled = true;
        btn_lower.disabled = true;

        randomDiceNumbers(1);

        const sum_a = sumDiceNumbers(div_dice_1_1.innerHTML, div_dice_2_1.innerHTML, div_dice_3_1.innerHTML);

        div_sum_a.innerHTML = 'pierwszy rzut suma: ' + sum_a;

        const computerDecision = biggerOrLower();

        points('COMPUTER', computerDecision);

        who_first = true;
    }

    function nextRound() {
        
        if (counter >= 5) {
            winner();
        } else {
            counter++;
            span_round.innerHTML = counter;

            clearGameBoard(dice_array);

            if (who_first === true) {
                computerRound();
            } else {
                playerRound();
            }
        }
        
    }

    btn_start.addEventListener('click', (e) => {

        // start_view.setAttribute( 'class', 'invisible' );
        span_round.innerHTML = counter;
        span_player_points.innerHTML = player_points;
        span_computer_points.innerHTML = computer_points;

        if (span_first_player.innerHTML === 'komputer') {
            computerRound();
        } else {
            playerRound();
        }
        
        btn_start.disabled = true;

    });

    btn_bigger.addEventListener('click', playerDecisionBigger);
    btn_lower.addEventListener('click', playerDecisionLower);

    btn_next.addEventListener('click', nextRound);

}());
