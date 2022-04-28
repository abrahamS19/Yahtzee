class YahtzeeGame {
  diceValues = []; // values of each dice after rolling
  diceSelected = []; // values of selected dice

  //Scoreboards:
  //Index 0-5: basic sums (number of 1s, 2s, etc)
  //Index 6-12: combinations (three of a kind, straights, YAHTZEE!, etc)
  scoreboardPlayer = [];
  scoreboardCPU = [];

  //True if score category has already been chosen
  scoreboardFilled_Player = [];
  scoreboardFilled_CPU = [];

  //Holds possible scores that can be entered into the scoreboard
  scoreboardPossibleValues = [];

  basicSumPlayer = 0;
  basicSumCPU = 0;

  bonusPlayer = false;
  bonusCPU = false;

  finalScorePlayer = 0;
  finalScoreCPU = 0;

  rollCounter = 0;
  turnCount = 1;
  isPlayerTurn = true;

  constructor() {
    //Initialize diceValues and selectedDice
    for (let i = 0; i < 5; i++) {
      this.diceValues[i] = i + 1;
      this.diceSelected[i] = false;
    }

    //Initialize scoreboard values and filled statuses
    for (let i = 0; i < 13; i++) {
      this.scoreboardPlayer[i] = 0;
      this.scoreboardCPU[i] = 0;

      this.scoreboardFilled_Player[i] = false;
      this.scoreboardFilled_CPU[i] = false;

      this.scoreboardPossibleValues[i] = 0;
    }
  }

  //"Rolls" the dice by randomizing each non-selected dice in the diceValues array
  rollDice() {
    if (this.rollCounter < 3) {
      this.rollCounter++;

      for (let i = 0; i < 5; i++) {
        if (this.diceSelected[i] == false) {
          this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
        }
      }

      this.calculatePossibleScores();
    }
    console.log(this.diceValues);
    console.log(this.scoreboardPossibleValues);
  }

  selectDice(diceIndex) {
    this.diceSelected[diceIndex] = true;
  }

  deselectDice(diceIndex) {
    this.diceSelected[diceIndex] = false;
  }

  scoreboardFilledCheck(player, index) {
    if (player == 'player') return this.scoreboardFilled_Player[index];
    else return this.scoreboardFilled_CPU[index];
  }

  //Calculate possible scores based on diceValues
  //Display these on the GUI scoreboard as colored numbers
  calculatePossibleScores() {
    this.resetScoreboardPossible();
    var valueOccurences = [0, 0, 0, 0, 0, 0];
    var valueSum = 0;

    //Basic sums
    //For each dice in diceValues, add to spot in scoreboardPossibleValues
    for (var i = 0; i < 5; i++) {
      //Basic sums
      this.scoreboardPossibleValues[this.diceValues[i] - 1] +=
        this.diceValues[i];

      //Occurences
      valueOccurences[this.diceValues[i] - 1] += 1;

      valueSum += this.diceValues[i];
    }

    //Combinations, index 6-12
    //Keep count of how many occurences of each number there are...
    //i = 6; Three of a kind: 3 occurences of a number = 3*number + sum of remaining == sum of all
    //i = 7; Four of a kind: 4 occurences of a number = 4*number + remaining == sum of all
    //i = 8; Full House: 3 occurences of a number, 2 of another = 25
    //i = 9; Small Straight: 1+ occurence of a number and for the three numbers after = 30
    //i = 10; Large Straight: 1+ occurence of a number and for the four numbers after = 40
    //i = 11; Chance = sum of all dice values
    //i = 12; YAHTZEE!: 5 occurences of a number = 50...if YAHTZEE! was already obtained, add additional 100 points (game-ender)

    //Three of a kind
    var i = 6;
    if (
      valueOccurences.indexOf(3) != -1 ||
      valueOccurences.indexOf(4) != -1 ||
      valueOccurences.indexOf(5) != -1
    ) {
      this.scoreboardPossibleValues[i] = valueSum;
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //Four of a kind
    i = 7;
    if (valueOccurences.indexOf(4) != -1 || valueOccurences.indexOf(5) != -1) {
      this.scoreboardPossibleValues[i] = valueSum;
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //Full House
    i = 8;
    if (valueOccurences.indexOf(2) != -1 && valueOccurences.indexOf(3) != -1) {
      this.scoreboardPossibleValues[i] = 25;
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //Small Straight
    // 1234, 2345, 3456
    i = 9;
    if (valueOccurences[2] >= 1 && valueOccurences[3] >= 1) {
      if (
        (valueOccurences[0] >= 1 && valueOccurences[1] >= 1) || //1234
        (valueOccurences[1] >= 1 && valueOccurences[4] >= 1) || //2345
        (valueOccurences[4] >= 1 && valueOccurences[5] >= 1)
      ) {
        //3456

        this.scoreboardPossibleValues[i] = 30;
      } else {
        this.scoreboardPossibleValues[i] = 0;
      }
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //Large Straight
    i = 10;
    if (
      valueOccurences[1] >= 1 &&
      valueOccurences[2] >= 1 &&
      valueOccurences[3] >= 1 &&
      valueOccurences[4] >= 1
    ) {
      if (valueOccurences[0] >= 1 || valueOccurences[5] >= 1) {
        //12345 or 23456
        this.scoreboardPossibleValues[i] = 40;
      } else {
        this.scoreboardPossibleValues[i] = 0;
      }
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //Chance
    i = 11;
    this.scoreboardPossibleValues[i] = valueSum;

    //YAHTZEE!
    i = 12;
    if (valueOccurences.indexOf(5) != -1) {
      /*    if(this.scoreboardFilledCheck(player, i)) {
                if(player == "player") {
                    deselectScore_Player(i);
                }
                else {
                    deselectScore_CPU(i);
                }
                this.scoreboardPossibleValues[i] += 100;
            }
            else */
      this.scoreboardPossibleValues[i] = 50;
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //console.log(this.scoreboardPossibleValues);
    //console.log(valueOccurences);
  }

  //Selects a score from scoreboardPossibleValues and adds it to the corresponding spot in scoreboardPlayer
  //Resets the roll counter
  //Switches the turn to the CPU
  async selectScore_Player(scoreIndex) {
    this.scoreboardPlayer[scoreIndex] =
      this.scoreboardPossibleValues[scoreIndex];
    this.scoreboardFilled_Player[scoreIndex] = true;

    if (scoreIndex >= 0 && scoreIndex <= 5) {
      this.basicSumPlayer += this.scoreboardPlayer[scoreIndex];
    }

    this.rollCounter = 0;
    this.isPlayerTurn = false;

    await this.hillClimber_play();
  }

  selectScore_CPU(scoreIndex) {
    this.scoreboardCPU[scoreIndex] = this.scoreboardPossibleValues[scoreIndex];
    this.scoreboardFilled_CPU[scoreIndex] = true;

    if (scoreIndex >= 0 && scoreIndex <= 5)
      this.basicSumCPU += this.scoreboardCPU[scoreIndex];

    this.rollCounter = 0;
    this.turnCount++;

    if (this.turnCount > 13) {
      //Game ends after 13 turns
      //Calculate the scores and display the winner
      this.getFinalScores();
    } else {
      this.isPlayerTurn = true;
    }
  }
  deselectScore_Player(scoreIndex) {
    this.scoreboardFilled_Player[scoreIndex] = false;
  }

  deselectScore_CPU(scoreIndex) {
    this.scoreboardFilled_CPU[scoreIndex] = false;
  }

  resetScoreboardPossible() {
    for (var i = 0; i < 12; i++) {
      this.scoreboardPossibleValues[i] = 0;
    }
  }

  checkBonusPlayer() {
    if (this.basicSumPlayer >= 63) this.bonusPlayer = true;
  }

  checkBonusCPU() {
    if (this.basicSumCPU >= 63) this.bonusCPU = true;
  }

  getFinalScores() {
    this.finalScorePlayer += this.basicSumPlayer;
    this.finalScoreCPU += this.basicSumCPU;

    for (var i = 6; i < 13; i++) {
      this.finalScorePlayer += this.scoreboardPlayer[i];
      this.finalScoreCPU += this.scoreboardCPU[i];
    }

    if (this.bonusPlayer) this.finalScorePlayer += 35;
    if (this.bonusCPU) this.finalScoreCPU += 35;
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async hillClimber_play(turn) {
    await this.sleep(750);
    this.rollDice();
    //Add animation call here

    await this.sleep(1000);

    this.selectScore_CPU(0);
    console.log(this.scoreboardCPU);
    console.log('CPU turn complete. Handing control to the player...');
  }
}

async function start() {
  let game = new YahtzeeGame();
  game.rollDice();
  game.selectScore_Player(0);

  game.sleep(1000);
  console.log(game.scoreboardPlayer);
}

// start();
