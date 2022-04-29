import React, { useState, useEffect } from 'react';
import { Container, Title } from '@mantine/core';
import Scoreboard from './Scoreboard';
import Gamespace from './Gamespace';

const Canvas = ({ classObject }) => {
  let table = [
    {
      type: 'Ones',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Twos',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Threes',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Fours',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Fives',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Sixes',
      choosable: true,
      player: null,
      ai: null,
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
      player: null,
      ai: null,
    },
    {
      type: 'Four of a kind',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Full House',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Small Straight',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Large Straight',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Chance',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'Yahtzee',
      choosable: true,
      player: null,
      ai: null,
    },
    {
      type: 'TOTAL SCORE',
      choosable: false,
      player: null,
      ai: null,
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
