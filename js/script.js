(function () {

    /* start page view */

    const inputName = document.querySelector('#input_name');

    const sectWhoFirst = document.querySelector('.sect_who_first');
    const btnFirstPlayer = document.querySelector('#btn_first_player');
    const spanFirstPlayer = document.querySelector('#first_player_name');

    const sectStart = document.querySelector('.sect_start');

    function scrollToNext(view) {

        view.scrollIntoView({
            behavior: 'smooth'
        });

    }

    function showFirstPlayerAndGoToStartBtn() {

        let playerName = document.querySelector('#input_name').value;

        let drawedNum = Math.round(Math.random());

        if (playerName === '') {
            playerName = 'Tajemniczy Gość';
        }

        if (drawedNum === 0) {
            spanFirstPlayer.innerHTML = playerName;
        } else {
            spanFirstPlayer.innerHTML = 'komputer';
        }

        btnFirstPlayer.disabled = true;

        setTimeout(function () {
            scrollToNext(sectStart);
        }, 1600);

    }

    inputName.addEventListener('keydown', (e) => {

        if (e.which === 13) {
            scrollToNext(sectWhoFirst);
        }

    });

    btnFirstPlayer.addEventListener('click', (e) => {

        showFirstPlayerAndGoToStartBtn();

    });

    /* game page view */

    const btnStart = document.querySelector('#btn_start');
    const startView = document.querySelector('#container_start');
    const gameView = document.querySelector('#container_game');

    let whoFirst = true; /* start: true - computer, false - user */

    const spanRound = document.querySelector('#round');
    let counter = 1;

    const divSumA = document.querySelector('#sum_a');
    const divSumB = document.querySelector('#sum_b');

    const spanPlayerPoints = document.querySelector('#player_points');
    const spanComputerPoints = document.querySelector('#computer_points');
    let computerPoints = 0;
    let playerPoints = 0;

    const spanWinner = document.querySelector('#winner');

    /* first throw */
    const divDice1_1 = document.querySelector('#dice_1_1');
    const divDice2_1 = document.querySelector('#dice_2_1');
    const divDice3_1 = document.querySelector('#dice_3_1');

    /* second throw */
    const divDice1_2 = document.querySelector('#dice_1_2');
    const divDice2_2 = document.querySelector('#dice_2_2');
    const divDice3_2 = document.querySelector('#dice_3_2');

    const btnBigger = document.querySelector('#bigger');
    const btnLower = document.querySelector('#lower');

    const divDecisionMsg = document.querySelector('#decision_msg')

    const btnNext = document.querySelector('#next_round');

    const msgWinner = document.querySelector('#msg_winner');
    const btnFromBegining = document.querySelector('#from_begining');
    
    const anchorToRules = document.querySelector('#id_to_rules');
    const ruleView = document.querySelector('#id_rules');
    const arrowUp = document.querySelector('#arrow');

    const diceArray = [divDice1_1, divDice2_1, divDice3_1, divDice1_2, divDice2_2, divDice3_2, divSumA, divSumB, divDecisionMsg];


    function clearGameBoard(arrayToClear) {

        arrayToClear.forEach(element => element.innerHTML = '');

    }

    function showWinner() {

        const playerPoints = parseInt(spanPlayerPoints.innerHTML);
        const computerPoints = parseInt(spanComputerPoints.innerHTML);

        clearGameBoard(diceArray);

        btnBigger.disabled = true;
        btnLower.disabled = true;
        btnNext.disabled = true;

        msgWinner.style.display = 'block';

        if (playerPoints > computerPoints) {
            spanWinner.innerHTML = document.querySelector('#input_name').value + ' jesteś zwycięzcą!';
        } else if (computerPoints > playerPoints) {
            spanWinner.innerHTML = 'Tym razem komputer wygrał';
        } else {
            spanWinner.innerHTML = 'Czyżby remis?';
        }

    }

    function generateRandomNumber() {

        let randomNr = Math.floor((Math.random() * 6) + 1);
        return randomNr;

    }

    function generateRandomDiceNumbers(round) {

        try {

            if (round == 1) {

                divDice1_1.innerHTML = generateRandomNumber();
                divDice2_1.innerHTML = generateRandomNumber();
                divDice3_1.innerHTML = generateRandomNumber();

            } else if (round == 2) {

                divDice1_2.innerHTML = generateRandomNumber();
                divDice2_2.innerHTML = generateRandomNumber();
                divDice3_2.innerHTML = generateRandomNumber();

            } else {
                throw new Error('problem with generating random dice number');
            }

        } catch (e) {
            console.log(e.name + ' :' + e.message);
        }
    }

    function sumDiceNumbers(a, b, c) {
        return parseInt(a) + parseInt(b) + parseInt(c);
    }

    function playComputerRound() {

        btnBigger.disabled = false;
        btnLower.disabled = false;
        
        btnNext.disabled = true;

        generateRandomDiceNumbers(1);

        const sumA = sumDiceNumbers(divDice1_1.innerHTML, divDice2_1.innerHTML, divDice3_1.innerHTML);

        divSumA.innerHTML = 'pierwszy rzut suma: ' + sumA;

        whoFirst = false;

    }

    function isBiggerOrLower() {

        return !!Math.round(Math.random());

    }

    function countPoints(playerName, flagDecision) {
        /* flag_decision: false - next sum will be lower; true - next sum will be bigger */
        btnNext.disabled = false;

        const sumA = sumDiceNumbers(divDice1_1.innerHTML, divDice2_1.innerHTML, divDice3_1.innerHTML);

        generateRandomDiceNumbers(2);

        const sumB = sumDiceNumbers(divDice1_2.innerHTML, divDice2_2.innerHTML, divDice3_2.innerHTML);
        divSumB.innerHTML = 'drugi rzut suma: ' + sumB;

        if (playerName === 'COMPUTER') {

            if (flagDecision === true) {
                
                divDecisionMsg.innerHTML = 'komputer obstawił, że suma oczek w kolejnym rzucie będzie WIĘKSZA';

                if (sumB > sumA) {
                    computerPoints++;
                    spanComputerPoints.innerHTML = computerPoints;
                } else if (sumB < sumA) {
                    playerPoints++;
                    spanPlayerPoints.innerHTML = playerPoints;
                } else {
                    console.log('może sumy są takie same?');
                }
            } else if (flagDecision === false) {
                divDecisionMsg.innerHTML = 'komputer obstawił, że suma oczek w kolejnym rzucie będzie MNIEJSZA';

                if (sumB < sumA) {
                    computerPoints++;
                    spanComputerPoints.innerHTML = computerPoints;
                } else if (sumB > sumA) {
                    playerPoints++;
                    spanPlayerPoints.innerHTML = playerPoints;
                } else {
                    console.log('może sumy są takie same?');
                }
            } else {
                console.log('problem z podjęciem decyzji przez komputer | points');
            }

        } else if (playerName === 'PLAYER') {

            if (flagDecision === true) {
                divDecisionMsg.innerHTML = 'obstawiłeś/aś, że suma oczek w kolejnym rzucie będzie WIĘKSZA';

                if (sumB > sumA) {
                    playerPoints++;
                    spanPlayerPoints.innerHTML = playerPoints;
                } else if (sumB < sumA) {
                    computerPoints++;
                    spanComputerPoints.innerHTML = computerPoints;
                } else {
                    console.log('może sumy są takie same?');
                }
            } else if (flagDecision === false) {
                divDecisionMsg.innerHTML = 'obstawiłeś/aś, że suma oczek w kolejnym rzucie będzie MNIEJSZA';

                if (sumB < sumA) {
                    playerPoints++;
                    spanPlayerPoints.innerHTML = playerPoints;
                } else if (sumB > sumA) {
                    computerPoints++;
                    spanComputerPoints.innerHTML = computerPoints;
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

    function showPlayerDecision(flagDecision) {

        btnBigger.disabled = true;
        btnLower.disabled = true;

        countPoints('PLAYER', flagDecision);

    }

    function showPlayerDecisionBigger() {
        showPlayerDecision(true);
    }

    function showPlayerDecisionLower() {
        showPlayerDecision(false);
    }

    function playPlayerRound() {

        btnBigger.disabled = true;
        btnLower.disabled = true;

        generateRandomDiceNumbers(1);

        const sumA = sumDiceNumbers(divDice1_1.innerHTML, divDice2_1.innerHTML, divDice3_1.innerHTML);

        divSumA.innerHTML = 'pierwszy rzut suma: ' + sumA;

        const computerDecision = isBiggerOrLower();

        setTimeout(function () {
            countPoints('COMPUTER', computerDecision);
        }, 500);

        whoFirst = true;
    }

    function goToNextRound() {

        if (counter >= 5) {
            showWinner();
        } else {
            counter++;
            spanRound.innerHTML = counter;

            clearGameBoard(diceArray);

            if (whoFirst === true) {
                playComputerRound();
            } else {
                playPlayerRound();
            }
        }

    }

    btnStart.addEventListener('click', (e) => {

        startView.setAttribute('class', 'invisible');
        gameView.style.display = 'flex';

        scrollToNext(gameView);

        spanRound.innerHTML = counter;
        spanPlayerPoints.innerHTML = playerPoints;
        spanComputerPoints.innerHTML = computerPoints;

        if (spanFirstPlayer.innerHTML === 'komputer') {
            playComputerRound();
        } else {
            playPlayerRound();
        }

        btnStart.disabled = true;

    });

    btnBigger.addEventListener('click', showPlayerDecisionBigger);
    btnLower.addEventListener('click', showPlayerDecisionLower);

    btnNext.addEventListener('click', goToNextRound);

    btnFromBegining.addEventListener('click', (e) => {
        window.location.reload(true);
    })
    
    /* game rules */
    
    anchorToRules.addEventListener('click', (e) => {
        ruleView.scrollIntoView({ 
          behavior: 'smooth' 
        });
    });
    
    arrowUp.addEventListener('click', (e) => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    });


}());
