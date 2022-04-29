import React, { useState, useEffect } from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import { Avatar, Button, Grid, Modal, Title, Text } from '@mantine/core';

import mario from '../img/mario.png';
import luigi from '../img/luigi.png';
import Scoreboard from './Scoreboard';

let reactDice = [];
let counter = 0;
let dice = [0, 1, 2, 3, 4];
let selected = [false, false, false, false, false];
let color = '#ffffff';

let picked = 'border-4 border-dashed border-green-800';

const Dice = ({ id, color, classObject, player }) => {
  const [isSelected, setIsSelected] = useState(false);

  const deselectDice = (id) => {
    console.log('pressed ', id);
    classObject.deselectDice(id);
    if (selected[id]) {
      selected[id] = !selected[id];
      setIsSelected(false);
    }
    console.log('in deselect ', selected[id]);
  };

  const selectDice = (id) => {
    console.log('pressed ', id);
    classObject.selectDice(id);

    if (!selected[id]) {
      selected[id] = !selected[id];
      console.log('in select ', selected[id]);
      setIsSelected(true);
    } else deselectDice(id);
  };

  return (
    <div
      onClick={() => {
        selectDice(id);
      }}
      className={isSelected && player ? picked : ''}
    >
      <ReactDice
        numDice={1}
        outline
        rollTime={0.5}
        ref={(dice) => {
          if (dice && !reactDice.includes(dice)) reactDice.push(dice);
        }}
        disableIndividual
        faceColor={color}
        dotColor={'#CD001A'}
        dieSize={100}
      />
    </div>
  );
};

const Gamespace = ({ classObject, table, setTableValues }) => {
  const [tableValues1, setTableValues1] = useState([]);
  const [player, setPlayer] = useState(true);
  const [next, setNext] = useState(false);
  const [opened, setOpened] = useState(true);
  const turn = 'text-4xl text-stone-100';

  counter = classObject.rollCounter;

  const rollAll = () => {
    setNext(false);
    classObject.rollDice();
    console.log('counter ', counter);
    if (counter <= 3) {
      reactDice.forEach((item) => {
        let i = reactDice.indexOf(item);
        console.log(classObject.diceValues[i]);
        if (!selected[i]) item.rollAll([classObject.diceValues[i]]);
      });
    }

    console.log('inside rolAll ', classObject.scoreboardPossibleValues);
    setTableValues1(() => [...classObject.scoreboardPossibleValues]);
  };

  return (
    <div className="w-full flex gap-x-3 justify-center mt-10">
      <div className="w-3/5 h-[vh] bg-green-500 rounded-xl border-8 border-white">
        <Grid columns={4} className="h-full">
          <Grid.Col span={4} className="h-1/3 flex items-center gap-x-10">
            <div className="w-28 h-28 bg-stone-100 overflow-hidden rounded-full ml-16">
              <img src={luigi} className="mt-[1px] ml-5 w-[72px]" />
            </div>
            <div>
              <Title
                className={!player ? turn : 'text-2xl'}
                style={{ fontFamily: 'Rubik' }}
              >
                Luigi (AI)
              </Title>
              {!player ? (
                <>
                  {/* {aiPlay()} */}
                  <Text></Text>
                </>
              ) : (
                ''
              )}
            </div>
          </Grid.Col>
          <Grid.Col span={4} className="grid items-center h-1/3">
            <div className="text-center">
              <div className="flex justify-center gap-4">
                {dice.map((item) => (
                  <Dice
                    key={item.name}
                    id={item}
                    color={color}
                    classObject={classObject}
                    player={player}
                  />
                ))}
              </div>
              <Button
                radius="lg"
                size="lg"
                // className="bg-gradient-to-r from-orange-400 to-red-500"
                className="bg-blue-600 mt-5"
                onClick={() => rollAll()}
                disabled={counter < 3 && player ? false : true}
              >
                Roll the Dice
              </Button>
            </div>
          </Grid.Col>
          <Grid.Col span={4} className="h-1/3 flex items-center gap-x-10">
            <div className="w-28 h-28 bg-stone-100 overflow-hidden rounded-full ml-16">
              <img src={mario} className="mt-[6px] ml-4 w-[80px]" />
            </div>

            <div>
              <Title
                className={player ? turn : 'text-2xl'}
                style={{ fontFamily: 'Rubik' }}
              >
                Mario
              </Title>
              {player ? (
                <Text>
                  Total rolls remaining: {3 - counter}
                  {3 - counter == 0 ? (
                    <Text className="text-white font-bold">
                      Please choose a score category.
                    </Text>
                  ) : (
                    ''
                  )}
                </Text>
              ) : (
                ''
              )}
            </div>
          </Grid.Col>
        </Grid>
      </div>
      {classObject.turnCount > 13 ? (
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          transition="fade"
          transitionDuration={600}
          transitiontimingfunction="ease"
        >
          <Title
            className="text-center font-normal"
            style={{ fontFamily: 'Rubik' }}
          >
            The winner is:{' '}
            <Title
              className=" "
              style={{
                fontFamily: 'Rubik',
                background: 'linear-gradient(to right, #004cff, #39dc18)',
                color: '#fff',
              }}
            >
              {classObject.finalScorePlayer > classObject.finalScoreCPU
                ? 'Mario'
                : 'Luigi'}
            </Title>
          </Title>
        </Modal>
      ) : (
        ''
      )}

      <Scoreboard
        classObject={classObject}
        table={table}
        tableValues={tableValues1}
        setPlayer={setPlayer}
        next={next}
        setNext={setNext}
        counter={counter}
      />
    </div>
  );
};

export default Gamespace;
