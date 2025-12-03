(function() {
    'use strict';
    console.log('reading js');

   // added my sounds here
    const clickSound = new Audio('sound/button-4-soundjay.mp3');
    const winSound = new Audio('sound/you-win-sequence-pixabay.mp3');
//intro message // overlay madlibs 
    var introOverlay = document.getElementById('intro-overlay');
    var skipIntroBtn = introOverlay.querySelector('.close');

    introOverlay.className = 'showing';
//goes away on its own or click button
    var introTimeout = setTimeout(function() {
        introOverlay.className = 'hidden';
    }, 25000);

    skipIntroBtn.addEventListener('click', function() {
        introOverlay.className = 'hidden';
        clearTimeout(introTimeout);
    });
//characters and buttons
    var monster1 = document.getElementById('Snoopy');
    var monster2 = document.getElementById('Courage');
    var messages = document.getElementById('messages');
    var startBtn = document.getElementById('start');
    var attackBtn = document.getElementById('attack0'); 
    var attackBtn1 = document.getElementById('attack1');

    var attacker, defender, defenderIndex;
//all my gifs for different moves for each character
    var snoopyGifs = [
        'images/snoop1.gif',
        'images/snoop2.gif',
        'images/snoop3.gif',
        'images/snoop4.gif',
        'images/snoop5.gif'
    ];

    var courageGifs = [
        'images/courage1.gif',
        'images/courage2.gif',
        'images/courage3.gif',
        'images/courage4.gif',
        'images/courage5.gif'
    ];
//the moves and how much points they are (from monster battle example)
    var gameData = {
        monsters: ['Snoopy', 'Courage'],
        hype: [0, 0],
        attack: [5, 15, 25, 30, 40],
        attackMessage: [
            'a Tiny Wiggle (+5 HYPE)!',
            'a Little Dancey Dance (+15 HYPE)!',
            'a Groovy Move (+25 HYPE)!',
            'a Chaos Dance (+30 HYPE)!',
            'a Showstopper(+40 HYPE)!'
        ],
        defendMessage: [
            'had no reaction (full hype!)',
            'reacted a little (half hype!)',
            'blocked it completely (no hype!)'
        ],
        index: 0
    };
//the spotlight on charcter turn
    function showSpotlight(playerName) {
        var spotlightId = playerName + '-spotlight';
        var spotlight = document.getElementById(spotlightId);
        if (spotlight) {
            spotlight.style.opacity = '1';
        }
    }
//go away
    function hideSpotlight(playerName) {
        var spotlightId = playerName + '-spotlight';
        var spotlight = document.getElementById(spotlightId);
        if (spotlight) {
            spotlight.style.opacity = '0';
        }
    }

    startBtn.addEventListener('click', function() {

        // button sound zap start button, choose random who first
        clickSound.play();

        gameData.index = Math.round(Math.random());

        messages.innerHTML = '<p>Get ready! <strong>' + gameData.monsters[gameData.index] + '</strong> opens the dance-off!</p>';

        if (gameData.index === 0) { // snoopy 
            attackBtn.className = 'showing';
            attackBtn1.className = 'hidden';
        } else {
            attackBtn.className = 'hidden'; //courage
            attackBtn1.className = 'showing';
        }
//hype dance bar // Reset hype bars
        gameData.hype = [0, 0];
        document.querySelector('#healthbar0 div').style.width = '0%';
        document.querySelector('#healthbar1 div').style.width = '0%';
        document.querySelector('#monsterhealth0').innerHTML = '0%';
        document.querySelector('#monsterhealth1').innerHTML = '0%';
    });

    // Main attack function
    function monsterAttack(playerIndex) {

        // button sound zap for dance
        clickSound.play();

        if (playerIndex === 0) {
            attacker = gameData.monsters[0];
            defender = gameData.monsters[1];
            defenderIndex = 1;
        } else {
            attacker = gameData.monsters[1];
            defender = gameData.monsters[0];
            defenderIndex = 0;
        }
//choosing what attack
        var thisAttack = Math.floor(Math.random() * 5);
        var thisDefense = Math.floor(Math.random() * 3);
//hide png
        attackBtn.className = 'hidden';
        attackBtn1.className = 'hidden';

        document.getElementById(attacker).className = 'attack' + thisAttack;
        messages.innerHTML = '<p><strong>' + attacker + '</strong> performs ' + gameData.attackMessage[thisAttack] + '</p>';

        showSpotlight(attacker);
//spotlight and gif
        var gifBox = document.getElementById(attacker + '-gif');
        var gifToShow = attacker === 'Snoopy' ? snoopyGifs[thisAttack] : courageGifs[thisAttack];
        document.getElementById(attacker).classList.add('hiddenImage');
        gifBox.innerHTML = '<img src="' + gifToShow + '">';
//blocks the dance move 
        setTimeout(function() {
            messages.innerHTML = '<p><strong>' + defender + '</strong> ' + gameData.defendMessage[thisDefense] + '</p>';
            document.getElementById(defender).className = 'defend' + thisDefense;

            if (thisDefense === 0) {
                gameData.hype[playerIndex] += gameData.attack[thisAttack];
            } else if (thisDefense === 1) {
                gameData.hype[playerIndex] += gameData.attack[thisAttack] / 2;
            }

            var hype = Math.min(100, Math.floor(gameData.hype[playerIndex]));
            document.querySelector('#healthbar' + playerIndex + ' div').style.width = hype + '%';
            document.querySelector('#monsterhealth' + playerIndex).innerHTML = hype + '%';
//get rid of image
            gifBox.innerHTML = '';
            document.getElementById(attacker).classList.remove('hiddenImage');
            hideSpotlight(attacker);

            checkWinningCondition(playerIndex, attacker);
        }, 2500);
    }
//winner
    function checkWinningCondition(playerIndex, attackerName) {
        setTimeout(function() {
            monster1.removeAttribute('class');
            monster2.removeAttribute('class');

            var hype = Math.floor(gameData.hype[playerIndex]);

            if (hype >= 100) {
//winner message 
                messages.innerHTML = '<p><strong>' + attackerName + '</strong> reached MAX HYPE and wins the dance-off!</p>';

                // winner stuff confetti and music
                winSound.play();

                if (attackerName === "Snoopy") {
                    document.getElementById("confetti-Snoopy").classList.remove("hidden");
                    document.getElementById("confetti-Snoopy").classList.add("showing");
                } else {
                    document.getElementById("confetti-Courage").classList.remove("hidden");
                    document.getElementById("confetti-Courage").classList.add("showing");
                }
 // Add reset button
                messages.innerHTML += '<button id="reset">Dance Again</button>';
                document.getElementById('reset').addEventListener('click', function() {
                    location.reload();
                });
//keep performing until max hype winner
            } else {
                gameData.index = gameData.index ? 0 : 1;
                messages.innerHTML = '<p>It\'s now <strong>' + gameData.monsters[gameData.index] + '\'s</strong> turn to perform!</p>';

                if (gameData.index === 0) {
                    attackBtn.className = 'showing';
                    attackBtn1.className = 'hidden';
                } else {
                    attackBtn.className = 'hidden';
                    attackBtn1.className = 'showing';
                }
            }
        }, 3000);
    }
//dance moves
    attackBtn.addEventListener('click', function() {
        monsterAttack(0);
    });
    attackBtn1.addEventListener('click', function() {
        monsterAttack(1);
    });

})();
