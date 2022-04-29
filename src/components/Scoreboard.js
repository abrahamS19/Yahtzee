import React, { useState, useEffect } from 'react';
import { Table, Button, Group } from '@mantine/core';

function Scoreboard({
  classObject,
  table,
  tableValues,
  setPlayer,
  setNext,
  next,
  counter,
}) {
  const [playerScores, setPlayerScores] = useState([]);
  const [aiScores, setAiScores] = useState([]);
  const [selected, setSelected] = useState(false);

  function board() {
    const selectScore = (id) => {
      classObject.selectScore_Player(id);
      console.log('selected score ', classObject.scoreboardPlayer[id]);
      setPlayerScores(() => [...classObject.scoreboardPlayer]);
      setSelected(true);
      setPlayer(classObject.isPlayerTurn);
      aiPlay();
    };

    const aiPlay = async () => {
      await classObject.cpu_play();
      setAiScores(() => [...classObject.scoreboardCPU]);
      console.log('aiscores ', aiScores);
      console.log('scorecpu ', classObject.scoreboardCPU);
      setPlayer(classObject.isPlayerTurn);
      setSelected(false);
      setNext(true);
    };

    return (
      <Table className="text-center" striped>
        <thead>
          <tr>
            <th>
              <Group position="center">Categories</Group>
            </th>
            <th>
              <Group position="center">Mario</Group>
            </th>
            <th>
              <Group position="center">Luigi</Group>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ones</td>
            <td>
              {playerScores[0] > -1 ? (
                playerScores[0]
              ) : tableValues[0] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(0)}
                >
                  {tableValues[0]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[0] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(0)}
                >
                  {tableValues[0]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[0] > -1 ? aiScores[0] : ''}</td>
          </tr>
          <tr>
            <td>Twos</td>
            <td>
              {/* {classObject.scoreboardPossibleValues[1] > 0
                ? classObject.scoreboardPossibleValues[1]
                : table[1].player} */}
              {playerScores[1] > -1 ? (
                playerScores[1]
              ) : tableValues[1] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(1)}
                >
                  {tableValues[1]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[1] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(1)}
                >
                  {tableValues[1]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[1] > -1 ? aiScores[1] : ''}</td>
          </tr>
          <tr>
            <td>Threes</td>
            <td>
              {playerScores[2] > -1 ? (
                playerScores[2]
              ) : tableValues[2] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(2)}
                >
                  {tableValues[2]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[2] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(2)}
                >
                  {tableValues[2]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[2] > -1 ? aiScores[2] : ''}</td>
          </tr>
          <tr>
            <td>Fours</td>
            <td>
              {playerScores[3] > -1 ? (
                playerScores[3]
              ) : tableValues[3] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(3)}
                >
                  {tableValues[3]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[3] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(3)}
                >
                  {tableValues[3]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[3] > -1 ? aiScores[3] : ''}</td>
          </tr>
          <tr>
            <td>Fives</td>
            <td>
              {playerScores[4] > -1 ? (
                playerScores[4]
              ) : tableValues[4] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(4)}
                >
                  {tableValues[4]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[4] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(4)}
                >
                  {tableValues[4]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[4] > -1 ? aiScores[4] : ''}</td>
          </tr>
          <tr>
            <td>Sixes</td>
            <td>
              {playerScores[5] > -1 ? (
                playerScores[5]
              ) : tableValues[5] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(5)}
                >
                  {tableValues[5]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[5] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(5)}
                >
                  {tableValues[5]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[5] > -1 ? aiScores[5] : ''}</td>
          </tr>
          <tr className="text-violet-500 font-semibold">
            <td>Sum</td>
            <td>{classObject.basicSumPlayer}</td>
            <td>{classObject.basicSumCPU}</td>
          </tr>
          <tr className="text-violet-500 font-semibold">
            <td>Bonus</td>
            <td>
              {classObject.turnCount > 13
                ? classObject.bonusPlayer
                  ? 35
                  : 0
                : ''}
            </td>
            <td>
              {classObject.turnCount > 13
                ? classObject.bonusCPU
                  ? 35
                  : 0
                : ''}
            </td>
          </tr>
          <tr>
            <td>Three of a kind</td>
            <td>
              {playerScores[6] > -1 ? (
                playerScores[6]
              ) : tableValues[6] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(6)}
                >
                  {tableValues[6]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[6] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(6)}
                >
                  {tableValues[6]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[6] > -1 ? aiScores[6] : ''}</td>
          </tr>
          <tr>
            <td>Four of a kind</td>
            <td>
              {playerScores[7] > -1 ? (
                playerScores[7]
              ) : tableValues[7] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(7)}
                >
                  {tableValues[7]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[7] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(7)}
                >
                  {tableValues[7]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[7] > -1 ? aiScores[7] : ''}</td>
          </tr>
          <tr>
            <td>Full House</td>
            <td>
              {playerScores[8] > -1 ? (
                playerScores[8]
              ) : tableValues[8] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(8)}
                >
                  {tableValues[8]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[8] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(8)}
                >
                  {tableValues[8]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[8] > -1 ? aiScores[8] : ''}</td>
          </tr>
          <tr>
            <td>Small Straight</td>
            <td>
              {playerScores[9] > -1 ? (
                playerScores[9]
              ) : tableValues[9] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(9)}
                >
                  {tableValues[9]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[9] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(9)}
                >
                  {tableValues[9]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[9] > -1 ? aiScores[9] : ''}</td>
          </tr>
          <tr>
            <td>Large Straight</td>
            <td>
              {playerScores[10] > -1 ? (
                playerScores[10]
              ) : tableValues[10] && !selected && !next && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(10)}
                >
                  {tableValues[10]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[10] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(10)}
                >
                  {tableValues[10]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[10] > -1 ? aiScores[10] : ''}</td>
          </tr>
          <tr>
            <td>Chance</td>
            <td>
              {playerScores[11] > -1 ? (
                playerScores[11]
              ) : tableValues[11] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(11)}
                >
                  {tableValues[11]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[11] < 0 && counter > 2 ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(12)}
                >
                  {tableValues[11]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[11] > -1 ? aiScores[11] : ''}</td>
          </tr>
          <tr>
            <td>Yahtzee</td>
            <td>
              {playerScores[12] > -1 ? (
                playerScores[12]
              ) : tableValues[12] && !selected && !next ? (
                <Button
                  className="h-5 bg-blue-600"
                  onClick={() => selectScore(12)}
                >
                  {tableValues[12]}
                </Button>
              ) : (
                ''
              )}
              {playerScores[12] < 0 && counter > 2 && !selected ? (
                <Button
                  className="h-5 bg-red-500"
                  onClick={() => selectScore(12)}
                >
                  {tableValues[12]}
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>{aiScores[12] > -1 ? aiScores[12] : ''}</td>
          </tr>
          <tr className="text-fuchsia-500 font-bold">
            <td>TOTAL SCORE</td>
            <td>
              {classObject.finalScorePlayer > 0
                ? classObject.finalScorePlayer
                : ''}
            </td>
            <td>
              {classObject.finalScoreCPU ? classObject.finalScoreCPU : ''}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  return (
    <div className="w-1/4 bg-white rounded-xl border-8 border-green-500">
      {board()}
    </div>
  );
}

export default Scoreboard;
