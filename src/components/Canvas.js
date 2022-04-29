import React, { useState, useEffect } from 'react';
import { Container, Title, Modal, Button, Group, Text } from '@mantine/core';
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
  const [opened, setOpened] = useState(false);
  return (
    <Container size="2xl" pt="lg" px="xl">
      <div className="w-full h-[892px] rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <Title
          className="pt-10 text-center text-4xl text-stone-100"
          style={{ fontFamily: 'Rubik' }}
        >
          YAHTZEE | 頂きます
        </Title>
        <Group position="right">
          <Button
            className="text-orange-200 mr-[8rem] pt-[-20px]"
            style={{ fontFamily: 'Rubik', fontSize: '1.5rem' }}
            onClick={() => setOpened(true)}
          >
            Rules
          </Button>
        </Group>

        <Modal opened={opened} size="xl" onClose={() => setOpened(false)}>
          <Title
            className="text-center text-orange-600"
            style={{ fontFamily: 'Rubik' }}
          >
            Rules
          </Title>
          <div className="m-8">
            <Text className="text-cyan-600 font-bold">
              Ones:{' '}
              <Text className="inline text-black font-normal">
                Get as many ones as possible
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Twos:{' '}
              <Text className="inline text-black font-normal">
                Get as many twos as possible
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Threes:{' '}
              <Text className="inline text-black font-normal">
                Get as many threes as possible
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Fours:{' '}
              <Text className="inline text-black font-normal">
                Get as many fours as possible
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Fives:{' '}
              <Text className="inline text-black font-normal">
                Get as many fives as possible
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Sixes:{' '}
              <Text className="inline text-black font-normal">
                Get as many sixes as possible
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Three of a kind:{' '}
              <Text className="inline text-black font-normal">
                Get three dice with the same number. Points are the sum all dice
                (not just the three of a kind)
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Four of a kind:{' '}
              <Text className="inline text-black font-normal">
                Get four dice with the same number. Points are the sum all dice
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Full House:{' '}
              <Text className="inline text-black font-normal">
                Get three of a kind and a pair. For instance, 1,1,3,3,3 or
                3,3,3,6,6 score 25 points
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Small straight:{' '}
              <Text className="inline text-black font-normal">
                Get four sequential dice, 1,2,3,4 or 2,3,4,5 or 3,4,5,6. Scores
                30 points
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Large straight:{' '}
              <Text className="inline text-black font-normal">
                Get five sequential dice, 1,2,3,4,5 or 2,3,4,5,6. Scores 40
                points
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              Chance:{' '}
              <Text className="inline text-black font-normal">
                Sum of face values of all dice. Basically a garbage can to get
                as big number as possible
              </Text>
            </Text>
            <Text className="text-cyan-600 font-bold">
              YAHTZEE:{' '}
              <Text className="inline text-black font-normal">
                Five of a kind. Scores 50 points. You can optionally get
                multiple Yahtzees
              </Text>
            </Text>
          </div>
        </Modal>

        <Gamespace
          classObject={classObject}
          table={table}
          setTableValues={setTableValues}
        />
      </div>
    </Container>
  );
};

export default Canvas;
