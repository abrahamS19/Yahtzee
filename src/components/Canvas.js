import React, { useState, useEffect } from 'react';
import { Container, Title } from '@mantine/core';
import Scoreboard from './Scoreboard';
import Gamespace from './Gamespace';

const Canvas = ({ classObject }) => {
  let table = [
    {
      type: 'Ones',
      choosable: true,
      player: classObject.scoreboardPlayer[0],
      ai: classObject.scoreboardCPU[0],
    },
    {
      type: 'Twos',
      choosable: true,
      player: classObject.scoreboardPlayer[1],
      ai: classObject.scoreboardCPU[1],
    },
    {
      type: 'Threes',
      choosable: true,
      player: classObject.scoreboardPlayer[2],
      ai: classObject.scoreboardCPU[2],
    },
    {
      type: 'Fours',
      choosable: true,
      player: classObject.scoreboardPlayer[3],
      ai: classObject.scoreboardCPU[3],
    },
    {
      type: 'Fives',
      choosable: true,
      player: classObject.scoreboardPlayer[4],
      ai: classObject.scoreboardCPU[4],
    },
    {
      type: 'Sixes',
      choosable: true,
      player: classObject.scoreboardPlayer[5],
      ai: classObject.scoreboardCPU[5],
    },
    {
      type: 'Sum',
      choosable: false,
      player: classObject.basicSumPlayer,
      ai: classObject.basicSumCPU,
    },
    { type: 'Bonus', choosable: false, player: 0, ai: 0 },
    {
      type: 'Three of a kind',
      choosable: true,
      player: classObject.scoreboardPlayer[6],
      ai: classObject.scoreboardCPU[6],
    },
    {
      type: 'Four of a kind',
      choosable: true,
      player: classObject.scoreboardPlayer[7],
      ai: classObject.scoreboardCPU[7],
    },
    {
      type: 'Full House',
      choosable: true,
      player: classObject.scoreboardPlayer[8],
      ai: classObject.scoreboardCPU[8],
    },
    {
      type: 'Small Straight',
      choosable: true,
      player: classObject.scoreboardPlayer[9],
      ai: classObject.scoreboardCPU[9],
    },
    {
      type: 'Large Straight',
      choosable: true,
      player: classObject.scoreboardPlayer[10],
      ai: classObject.scoreboardCPU[10],
    },
    {
      type: 'Chance',
      choosable: true,
      player: classObject.scoreboardPlayer[11],
      ai: classObject.scoreboardCPU[11],
    },
    {
      type: 'Yahtzee',
      choosable: true,
      player: classObject.scoreboardPlayer[12],
      ai: classObject.scoreboardCPU[12],
    },
    {
      type: 'TOTAL SCORE',
      choosable: false,
      player: classObject.finalScorePlayer,
      ai: classObject.finalScoreCPU,
    },
  ];

  const [tableValues, setTableValues] = useState(table);
  return (
    <Container size="2xl" pt="lg" px="xl">
      <div className="w-full h-[892px] rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <Title
          className="pt-10 text-center text-4xl text-stone-100"
          style={{ fontFamily: 'Rubik' }}
        >
          YAHTZEE | 頂きます
        </Title>
        {/* <div className="w-full flex gap-x-3 justify-center mt-10"> */}
        <Gamespace
          classObject={classObject}
          table={table}
          setTableValues={setTableValues}
        />
        {/* <Scoreboard classObject={classObject} table={table} />
        </div> */}
      </div>
    </Container>
  );
};

export default Canvas;
