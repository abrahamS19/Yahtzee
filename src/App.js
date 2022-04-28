import { MantineProvider } from '@mantine/core';
import Canvas from './components/Canvas';
import { useState } from 'react';

class YahtzeeGame {
  //diceValues contains the value for each dice
  //Constructor will initialize to [1, 2, 3, 4, 5]
  //Values to
  diceValues = [];
  diceSelected = [];

  //Scoreboards:
  //Index 0-5: basic sums (number of 1s, 2s, etc)
  //Index 6-12: combinations (three of a kind, straights, YAHTZEE!, etc)
  scoreboardPlayer = [];
  scoreboardCPU = [];

  //True if score category has already been chosen, else False
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

  valueOccurences = [0, 0, 0, 0, 0, 0];

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

  //Selects dice to freeze, prevent rerolling in rollDice()
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
    this.resetValueOccurences();

    var valueSum = 0;

    //Basic sums
    //For each dice in diceValues, add to spot in scoreboardPossibleValues
    for (var i = 0; i < 5; i++) {
      //Basic sums
      this.scoreboardPossibleValues[this.diceValues[i] - 1] +=
        this.diceValues[i];

      //Occurences
      this.valueOccurences[this.diceValues[i] - 1] += 1;

      valueSum += this.diceValues[i];
    }

    console.log('Occ: ' + this.valueOccurences);
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
      this.valueOccurences.indexOf(3) != -1 ||
      this.valueOccurences.indexOf(4) != -1 ||
      this.valueOccurences.indexOf(5) != -1
    ) {
      this.scoreboardPossibleValues[i] = valueSum;
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //Four of a kind
    i = 7;
    if (
      this.valueOccurences.indexOf(4) != -1 ||
      this.valueOccurences.indexOf(5) != -1
    ) {
      this.scoreboardPossibleValues[i] = valueSum;
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //Full House
    i = 8;
    if (
      this.valueOccurences.indexOf(2) != -1 &&
      this.valueOccurences.indexOf(3) != -1
    ) {
      this.scoreboardPossibleValues[i] = 25;
    } else {
      this.scoreboardPossibleValues[i] = 0;
    }

    //Small Straight
    // 1234, 2345, 3456
    i = 9;
    if (this.valueOccurences[2] >= 1 && this.valueOccurences[3] >= 1) {
      if (
        (this.valueOccurences[0] >= 1 && this.valueOccurences[1] >= 1) || //1234
        (this.valueOccurences[1] >= 1 && this.valueOccurences[4] >= 1) || //2345
        (this.valueOccurences[4] >= 1 && this.valueOccurences[5] >= 1)
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
      this.valueOccurences[1] >= 1 &&
      this.valueOccurences[2] >= 1 &&
      this.valueOccurences[3] >= 1 &&
      this.valueOccurences[4] >= 1
    ) {
      if (this.valueOccurences[0] >= 1 || this.valueOccurences[5] >= 1) {
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
    if (this.valueOccurences.indexOf(5) != -1) {
      /*
          if(this.scoreboardFilledCheck(player, i)) {
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

    this.resetDiceSelection();

    await this.cpu_play();
  }

  selectScore_CPU(scoreIndex) {
    this.scoreboardCPU[scoreIndex] = this.scoreboardPossibleValues[scoreIndex];
    this.scoreboardFilled_CPU[scoreIndex] = true;

    if (scoreIndex >= 0 && scoreIndex <= 5)
      this.basicSumCPU += this.scoreboardCPU[scoreIndex];

    this.rollCounter = 0;
    this.turnCount++;

    this.resetDiceSelection();

    if (this.turnCount > 13) {
      //Game ends after 13 turns
      //Calculate the scores and display the winner
      this.getFinalScores();
    } else {
      this.isPlayerTurn = true;
    }
  }

  resetScoreboardPossible() {
    for (var i = 0; i < 12; i++) {
      this.scoreboardPossibleValues[i] = 0;
    }
  }

  resetValueOccurences() {
    for (var i = 0; i < 6; i++) {
      this.valueOccurences[i] = 0;
    }
    console.log('Reset Occ: ' + this.valueOccurences);
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

  resetDiceSelection() {
    for (var i = 0; i < 5; i++) this.diceSelected[i] = false;
  }
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /*Min-Conflicts algorithm:
    Given a set of values and a constraint, pick the values that conflicts with the constraint
    Randomly select one of these conflicting values, replace with a value that minimizes the number of conflicts
    Repeat until solution that meets the constraint is found, or max iterations has been reached


    Adapting for Yahtzee:
    Same algorithm, except:
    -Values that conflict with constraints are replaced with random values
    -There are multiple constraints to choose from

    How do we determine which constraint to choose?
    The first dice roll gives the first set of values, and from that, we can choose which available constraints to go for

    How do we determine which constraint is the closest to being non-conflicted?
    Closeness is determined by the current state of the dice values and remaining rolls in the turn
    Remember that constraints/categories can only be chosen once...
    5 occurences of the same number: YAHTZEE!, sums, chance, 4ok, 3ok
    4 occurences: sums, 4ok, 3ok | possible YAHTZEE!
    3 occurences: sums, 3ok, FH | possible FH, 4ok, YAHTZEE!
    2 occurences: SS, LS, sums, 3ok
    1 occurences: SS, LS, chance

    Based on the Optimal Solitare Yahtzee Player, a hierarchy of categories guides the algorithm
    into determining which constraint to prioritize
    http://www-set.win.tue.nl/~wstomv/misc/yahtzee/trivia.html

    Hierarchy was created based on expected value, % of games with zero points in category, 
    difficulty in satisfying the category, and max points given

  */

  //Combinations, index 6-12
  //Keep count of how many occurences of each number there are...
  //i = 6; Three of a kind: 3 occurences of a number = 3*number + sum of remaining == sum of all
  //i = 7; Four of a kind: 4 occurences of a number = 4*number + remaining == sum of all
  //i = 8; Full House: 3 occurences of a number, 2 of another = 25
  //i = 9; Small Straight: 1+ occurence of a number and for the three numbers after = 30
  //i = 10; Large Straight: 1+ occurence of a number and for the four numbers after = 40
  //i = 11; Chance = sum of all dice values
  //i = 12; YAHTZEE!: 5 occurences of a number = 50
  cpuHierarchy = [12, 10, 9, 8, 5, 4, 3, 2, 11, 6, 7, 1, 0];
  //YAHTZEE!, LS, SS, FH, 6s, 5s, 4s, 3s, C, 3k, 4k, 2s, 1s

  async cpu_play() {
    await this.sleep(1000);

    for (var i = 0; i < 3; i++) {
      if (this.isPlayerTurn) break;

      this.rollDice();
      //Add animation call here

      //await this.sleep(1000);

      //Choose category based on roll and highest number of occurences
      //Since this cascades downward, we can rule out scenarios as we go
      //i.e. if we reach ...indexOf(2), we know there is no 3 in valueOccurences
      //(The numbers in valueOccurences have to add to up 5 (total number of dice))
      if (this.valueOccurences.indexOf(5) != -1) {
        //If all five numbers match:
        this.cpu_select5();
      } else if (this.valueOccurences.indexOf(4) != -1) {
        //If four numbers match
        this.cpu_select4();
      } else if (this.valueOccurences.indexOf(3) != -1) {
        this.cpu_select3();
      } else if (this.valueOccurences.indexOf(2) != -1) {
        this.cpu_select2();
      } else {
        this.cpu_select1();
      }

      //await this.sleep(1000);
    }

    console.log(this.scoreboardCPU);
    console.log('CPU turn complete. Handing control to the player...');
  }

  //Selects a score or selects dice for reroll, depending on roll count and value of the dice
  cpu_select5() {
    console.log('using select5...');
    if (!this.scoreboardFilled_CPU[12]) {
      //If YAHTZEE! is available
      this.selectScore_CPU(12);
    } else if (!this.scoreboardFilled_CPU[this.valueOccurences.indexOf(5)]) {
      //If value's basic sum is available
      this.selectScore_CPU(this.valueOccurences.indexOf(5));
    } else if (!this.scoreboardFilled_CPU[7]) {
      //If 4ok is available
      if (this.rollCounter == 3 || this.valueOccurences.indexOf(5) >= 3)
        //if roll 3 or dice value is 4, 5, 6, select
        this.selectScore_CPU(7);
      else {
        //if rolls 1 or 2 and dice value is 1, 2, 3, select four dice and reroll the other
        this.selectDice(0);
        this.selectDice(1);
        this.selectDice(2);
        this.selectDice(3);
      }
    } else if (!this.scoreboardFilled_CPU[6]) {
      //If 3ok is available
      if (this.rollCounter == 3 || this.valueOccurences.indexOf(5) >= 3)
        this.selectScore_CPU(7);
      else {
        //if rolls 1 or 2 and dice value is 1, 2, 3, select four dice and reroll the other
        this.selectDice(0);
        this.selectDice(1);
        this.selectDice(2);
      }
    } else if (this.rollCounter == 3 && !this.scoreboardFilled_CPU[11]) {
      //If Chance is available
      this.selectScore_CPU(11);
    } else {
      //None of the above are available, pick starting from lowest value category // failsafe
      for (var i = 12; i >= 0; i--) {
        if (!this.scoreboardFilled_CPU[i]) {
          this.selectScore_CPU(i);
          break;
        }
      }
    }
  }

  cpu_select4() {
    console.log('using select4...');
    if (this.rollCounter == 3) {
      if (!this.scoreboardFilled_CPU[this.valueOccurences.indexOf(4)]) {
        //Basic sums
        this.selectScore_CPU(this.valueOccurences.indexOf(4));
      } else if (!this.scoreboardFilled_CPU[7]) {
        //4ok
        this.selectScore_CPU(7);
      } else if (!this.scoreboardFilled_CPU[6]) {
        //3ok
        this.selectScore_CPU(6);
      } else if (!this.scoreboardFilled_CPU[11]) {
        //Chance
        this.selectScore_CPU(11);
      } else {
        //failsafe
        for (var i = 12; i >= 0; i--) {
          if (!this.scoreboardFilled_CPU[i]) {
            this.selectScore_CPU(i);
            break;
          }
        }
      }
    } else if (this.rollCounter != 3) {
      //If YAHTZEE!, sums, or 4ok are available
      if (
        !this.scoreboardFilled_CPU[12] ||
        !this.scoreboardFilled_CPU[this.valueOccurences.indexOf(4)] ||
        !this.scoreboardFilled_CPU[7]
      ) {
        for (var i = 0; i < 5; i++) {
          if (this.diceValues[i] == this.valueOccurences.indexOf(4) + 1)
            this.selectDice(i);
        }
      } else if (!this.scoreboardFilled_CPU[8]) {
        //if FH is available
        for (var i = 0, x = 0; i < 5 && x < 4; i++) {
          if (this.diceValues[i] == this.valueOccurences.indexOf(4) + 1) {
            this.selectDice(i);
            x++;
          }
        }

        this.selectDice(this.valueOccurences.indexOf(1));
      } else if (!this.scoreboardFilled_CPU[6]) {
        //if 3ok is available
        for (var i = 0, x = 0; i < 5 && x < 3; i++) {
          if (this.diceValues[i] == this.valueOccurences.indexOf(4) + 1) {
            this.selectDice(i);
            x++;
          }
        }
      } else if (!this.scoreboardFilled_CPU[11]) {
        //if chance is available
        for (var i = 0; i < 5; i++) {
          if (this.diceValues[i] >= 4) this.selectDice(i);
        }
      }
      //otherwise, just reroll all of the dice
    }
  }

  cpu_select3() {
    console.log('using select3...');
    if (this.rollCounter == 3) {
      if (
        !this.scoreboardFilled_CPU[8] &&
        this.valueOccurences.indexOf(2) != -1
      ) {
        //if FH is available
        this.selectScore_CPU(8);
      } else if (!this.scoreboardFilled_CPU[6]) {
        //3ok
        this.selectScore_CPU(6);
      } else if (!this.scoreboardFilled_CPU[this.valueOccurences.indexOf(3)]) {
        //Basic sums
        this.selectScore_CPU(this.valueOccurences.indexOf(3));
      } else if (!this.scoreboardFilled_CPU[11]) {
        //Chance
        this.selectScore_CPU(11);
      } else {
        //failsafe
        for (var i = 12; i >= 0; i--) {
          if (!this.scoreboardFilled_CPU[i]) {
            this.selectScore_CPU(i);
            break;
          }
        }
      }
    } else if (this.rollCounter != 3) {
      if (!this.scoreboardFilled_CPU[8]) {
        //if FH is available
        if (this.valueOccurences.indexOf(2) != -1) {
          //if FH already exists
          this.selectScore_CPU(8);
        } else {
          //keep 3 and 1, reroll the other
          for (var i = 0; i < 5; i++) {
            if (
              this.diceValues[i] == this.valueOccurences.indexOf(3) + 1 ||
              this.diceValues[i] == this.valueOccurences.indexOf(1) + 1
            ) {
              this.selectDice(i);
            }
          }
        }
      } else {
        //if 4ok, YAHTZEE!, or sums are available, keep 3 and reroll other 2
        for (var i = 0; i < 5; i++) {
          if (this.diceValues[i] == this.valueOccurences.indexOf(3) + 1) {
            this.selectDice(i);
          }
        }
      }
    }
  }

  cpu_select2() {
    console.log('using select2...');
    if (this.rollCounter == 3) {
      if (!this.scoreboardFilled_CPU[9]) {
        //if small straight available
        if (this.scoreboardPossibleValues[9] != 0) this.selectScore_CPU(9);
      } else if (!this.scoreboardFilled_CPU[8]) {
        //if FH is available
        if (this.valueOccurences.indexOf(3) != -1) {
          this.selectScore_CPU(8);
        }
      } else if (!this.scoreboardFilled_CPU[11]) {
        //if chance available
        this.selectScore_CPU(11);
      } else {
        //failsafe
        for (var i = 12; i >= 0; i--) {
          if (!this.scoreboardFilled_CPU[i]) {
            this.selectScore_CPU(i);
            break;
          }
        }
      }
    } else if (this.rollCounter != 3) {
      var num2s = 0;
      for (var i = 0; i < 6; i++) {
        //count number of 2-occurences
        if (this.valueOccurences[i] == 2) {
          num2s++;
        }
      }
      console.log('Num 2s: ' + num2s);
      if (num2s == 2) {
        for (var i = 0; i < 6; i++) {
          //select the dice that have 2 occurences
          if (this.valueOccurences[i] == 2) {
            for (var j = 0; j < 5; j++) {
              if (this.diceValues[j] == i + 1) {
                this.selectDice(j);
                console.log('Dice #' + j + ' selected');
              }
            }
          }
        }
      } else if (
        !this.scoreboardFilled_CPU[10] &&
        this.scoreboardPossibleValues[9] != 0
      ) {
        //if large straight available and small straight already exists
        this.selectDice(this.diceValues.indexOf(3));
        this.selectDice(this.diceValues.indexOf(4));

        if (
          this.diceValues.indexOf(1) != -1 &&
          this.diceValues.indexOf(2) != -1
        ) {
          this.selectDice(this.diceValues.indexOf(1));
          this.selectDice(this.diceValues.indexOf(2));
        } else if (
          this.diceValues.indexOf(2) != -1 &&
          this.diceValues.indexOf(5) != -1
        ) {
          this.selectDice(this.diceValues.indexOf(2));
          this.selectDice(this.diceValues.indexOf(5));
        } else if (
          this.diceValues.indexOf(5) != -1 &&
          this.diceValues.indexOf(6) != -1
        ) {
          this.selectDice(this.diceValues.indexOf(5));
          this.selectDice(this.diceValues.indexOf(6));
        }
      }
    }
  }

  cpu_select1() {
    console.log('using select1...');
    if (
      !this.scoreboardFilled_CPU[10] &&
      this.scoreboardPossibleValues[10] != 0
    ) {
      //if large straight available and exists
      this.selectScore_CPU(10);
    } else if (
      !this.scoreboardFilled_CPU[9] &&
      this.scoreboardPossibleValues[9] != 0
    ) {
      //if small straight available and exists
      this.selectScore_CPU(9);
    }

    if (this.rollCounter == 3) {
      if (!this.scoreboardFilled_CPU[11]) {
        //Chance
        this.selectScore_CPU(11);
      } else {
        //failsafe
        for (var i = 12; i >= 0; i--) {
          if (!this.scoreboardFilled_CPU[i]) {
            this.selectScore_CPU(i);
            break;
          }
        }
      }
    } else if (this.rollCounter != 3) {
      if (
        !this.scoreboardFilled_CPU[10] &&
        this.scoreboardPossibleValues[9] != 0
      ) {
        //if large straight available and small straight already exists
        this.selectDice(this.diceValues.indexOf(3));
        this.selectDice(this.diceValues.indexOf(4));

        if (
          this.diceValues.indexOf(1) != -1 &&
          this.diceValues.indexOf(2) != -1
        ) {
          this.selectDice(this.diceValues.indexOf(1));
          this.selectDice(this.diceValues.indexOf(2));
        } else if (
          this.diceValues.indexOf(2) != -1 &&
          this.diceValues.indexOf(5) != -1
        ) {
          this.selectDice(this.diceValues.indexOf(2));
          this.selectDice(this.diceValues.indexOf(5));
        } else if (
          this.diceValues.indexOf(5) != -1 &&
          this.diceValues.indexOf(6) != -1
        ) {
          this.selectDice(this.diceValues.indexOf(5));
          this.selectDice(this.diceValues.indexOf(6));
        }
      }
    }
  }
}

let game = new YahtzeeGame();

function App() {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'Rubik',
          fontFamilyMonospace: 'Rubik',
          headings: { fontFamily: 'Rubik' },
        }}
      />
      <Canvas classObject={game} />
    </>
  );
}

export default App;
