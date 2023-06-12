import React from 'react'
import { FixedSizeGrid, FixedSizeList } from 'react-window'

import { data } from '../data/MOCK_DATA';

const header: Array<string> = [];
for(let keys in data[0]){
  header.push(keys);
}

function MultiGrid() {
  return (
    <>
    
    </>
  )
}

export default MultiGrid