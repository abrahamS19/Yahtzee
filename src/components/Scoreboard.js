import React, { useState, useEffect } from 'react';
import { Table, Button, SimpleGrid } from '@mantine/core';

function board(table, tableValues) {
  return (
    <Table className="text-center" striped>
      <thead>
        <tr>
          <th>Combos/Scores</th>
          <th>Human-player</th>
          <th>AI-player</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ones</td>
          <td>
            {tableValues[0] ? (
              <Button className="h-5 bg-blue-600">{tableValues[0]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[0].ai}</td>
        </tr>
        <tr>
          <td>Twos</td>
          <td>
            {/* {classObject.scoreboardPossibleValues[1] > 0
                ? classObject.scoreboardPossibleValues[1]
                : table[1].player} */}
            {tableValues[1] ? (
              <Button className="h-5 bg-blue-600">{tableValues[1]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[1].ai}</td>
        </tr>
        <tr>
          <td>Threes</td>
          <td>
            {tableValues[2] ? (
              <Button className="h-5 bg-blue-600">{tableValues[2]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[2].ai}</td>
        </tr>
        <tr>
          <td>Fours</td>
          <td>
            {tableValues[3] ? (
              <Button className="h-5 bg-blue-600">{tableValues[3]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[3].ai}</td>
        </tr>
        <tr>
          <td>Fives</td>
          <td>
            {tableValues[4] ? (
              <Button className="h-5 bg-blue-600">{tableValues[4]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[4].ai}</td>
        </tr>
        <tr>
          <td>Sixes</td>
          <td>
            {tableValues[5] ? (
              <Button className="h-5 bg-blue-600">{tableValues[5]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[5].ai}</td>
        </tr>
        <tr className="text-violet-500 font-semibold">
          <td>Sum</td>
          <td>{table[6].player}</td>
          <td>{table[6].ai}</td>
        </tr>
        <tr className="text-violet-500 font-semibold">
          <td>Bonus</td>
          <td>{table[7].player}</td>
          <td>{table[7].ai}</td>
        </tr>
        <tr>
          <td>Three of a kind</td>
          <td>
            {tableValues[6] ? (
              <Button className="h-5 bg-blue-600">{tableValues[6]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[8].ai}</td>
        </tr>
        <tr>
          <td>Four of a kind</td>
          <td>
            {tableValues[7] ? (
              <Button className="h-5 bg-blue-600">{tableValues[7]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[9].ai}</td>
        </tr>
        <tr>
          <td>Full House</td>
          <td>
            {tableValues[8] ? (
              <Button className="h-5 bg-blue-600">{tableValues[8]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[10].ai}</td>
        </tr>
        <tr>
          <td>Small Straight</td>
          <td>
            {tableValues[9] ? (
              <Button className="h-5 bg-blue-600">{tableValues[9]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[11].ai}</td>
        </tr>
        <tr>
          <td>Large Straight</td>
          <td>
            {tableValues[10] ? (
              <Button className="h-5 bg-blue-600">{tableValues[10]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[12].ai}</td>
        </tr>
        <tr>
          <td>Chance</td>
          <td>
            {tableValues[11] ? (
              <Button className="h-5 bg-blue-600">{tableValues[11]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[13].ai}</td>
        </tr>
        <tr>
          <td>Yahtzee</td>
          <td>
            {tableValues[12] ? (
              <Button className="h-5 bg-blue-600">{tableValues[12]}</Button>
            ) : (
              ''
            )}
          </td>
          <td>{table[14].ai}</td>
        </tr>
        <tr className="text-fuchsia-500 font-bold">
          <td>TOTAL SCORE</td>
          <td>{table[15].player}</td>
          <td>{table[15].ai}</td>
        </tr>
      </tbody>
    </Table>
  );
}

function Scoreboard({ table, tableValues }) {
  return (
    <div className="w-1/4 bg-white rounded-xl border-8 border-green-500">
      {board(table, tableValues)}
    </div>
  );
}

export default Scoreboard;
