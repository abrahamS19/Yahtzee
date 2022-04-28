import React, { useState, useEffect } from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import { Avatar, Button, Grid, Group, Table, Text } from '@mantine/core';

import mario from '../img/mario.png';
import luigi from '../img/luigi.png';
import Scoreboard from './Scoreboard';

let reactDice = [];
// let selectedDice = [];
let dice = [0, 1, 2, 3, 4];
let selected = [false, false, false, false, false];
let color = '#ffffff';
let counter;

const deselectDice = (id) => {
  // setSelected((e) => !e);
  console.log('pressed ', id);
  if (selected[id]) {
    selected[id] = !selected[id];
    // selectedDice.splice(id, 1);
    // console.log('selectedDice ', selectedDice);
  }
  console.log('in deselect ', selected[id]);
  //   console.log('deselectDice ', reactDice);
};

const selectDice = (id) => {
  console.log('pressed ', id);
  //   selectedDice = reactDice.splice(id, 1);
  if (!selected[id]) {
    // selectedDice.push(reactDice[id]);
    selected[id] = !selected[id];
    console.log('in select ', selected[id]);
  } else deselectDice(id);
  //   console.log('selectDice ', reactDice);
  //   console.log(selectedDice);
};
const Dice = ({ id, color }) => {
  //   const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => {
        selectDice(id);
      }}
    >
      <ReactDice
        numDice={1}
        outline
        rollTime={0.7}
        ref={(dice) => {
          reactDice.push(dice);
        }}
        disableIndividual
        faceColor={color}
        dotColor={'#CD001A'}
        dieSize={80}
      />
    </div>
  );
};

const Gamespace = ({ classObject, table }) => {
  const [tableValues, setTableValues] = useState([]);

  //   let tableValues = [
  //     // { cat: 'Ones', value: null },
  //     // { cat: 'Twos', value: null },
  //     // { cat: 'Threes', value: null },
  //     // { cat: 'Fours', value: null },
  //     // { cat: 'Fives', value: null },
  //     // { cat: 'Sixes', value: null },
  //     // { cat: 'Three of a kind', value: null },
  //     // { cat: 'Four of a kind', value: null },
  //     // { cat: 'Full House', value: null },
  //     // { cat: 'Small Straight', value: null },
  //     // { cat: 'Large Straight', value: null },
  //     // { cat: 'Chance', value: null },
  //     // { cat: 'Yahtzee', value: null },
  //   ];

  //   const start = () => {

  //     setTableValues(classObject.scoreboardPossibleValues);

  //     console.log(tableValues);
  //     rollAll();
  //   };

  const rollAll = () => {
    setTableValues([]);
    classObject.rollDice();
    reactDice.map((item) => {
      // if (selectedDice.indexOf(item) === -1) item.rollAll();
      let i = reactDice.indexOf(item);
      console.log(classObject.diceValues[i]);
      if (!selected[i]) item.rollAll([classObject.diceValues[i]]);
    });
    //   for (let i = 0; i < reactDice.length; i++) {
    //     reactDice[i].rollAll([classObject.diceValues[i]]);
    //   }

    // for (let i = 0; i < 13; i++) {
    //   let n = classObject.scoreboardPossibleValues[i];
    //   if (n != 0) tableValues[i] = classObject.scoreboardPossibleValues[i];
    // }

    // tableValues = classObject.scoreboardPossibleValues;
    setTableValues(classObject.scoreboardPossibleValues);
    console.log(tableValues);
  };

  const Select = () => {
    // if (tableValues.length > 0) {
    return (
      <Text>
        Choose a score:
        {tableValues.map((e) => {
          if (e > 0) {
            <Button className="h-5 bg-blue-600">g</Button>;
          }
        })}
      </Text>
    );
    // }
  };

  const [state, setstate] = useState(true);

  return (
    <div className="w-full flex gap-x-3 justify-center mt-10">
      <div className="w-3/5 h-[vh] bg-green-500 rounded-xl border-8 border-white">
        <Grid columns={4} className="h-full">
          <Grid.Col span={4} className="h-1/3 flex items-center gap-x-10">
            <div className="w-28 h-28 bg-stone-100 overflow-hidden rounded-full ml-16">
              <img src={luigi} className="mario-img mt-[1px] ml-5 w-[72px]" />
            </div>
            <div className="flex justify-center items-center"></div>
          </Grid.Col>
          <Grid.Col span={4} className="grid items-center h-1/3">
            <div className="text-center">
              <div className="flex justify-center">
                {dice.map((item) => (
                  <Dice key={item.name} id={item} color={color} />
                ))}
              </div>
              <Button
                radius="lg"
                // className="bg-gradient-to-r from-orange-400 to-red-500"
                className="bg-blue-600 mt-5"
                onClick={() => rollAll()}
              >
                Roll the Dice
              </Button>
            </div>
          </Grid.Col>
          <Grid.Col span={4} className="h-1/3 flex items-center gap-x-10">
            <div className="w-28 h-28 bg-stone-100 overflow-hidden rounded-full ml-16">
              <img src={mario} className="mario-img mt-[6px] ml-4 w-[80px]" />
            </div>
            <div className="flex justify-center items-center">
              <Select />
            </div>
          </Grid.Col>
        </Grid>
      </div>
      <Scoreboard
        classObject={classObject}
        table={table}
        tableValues={tableValues}
      />
    </div>
  );
};

export default Gamespace;
