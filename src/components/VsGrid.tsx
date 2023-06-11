import React, { useState } from 'react'
import {VariableSizeGrid, VariableSizeGridProps} from "react-window"
import { data } from '../data/MOCK_DATA'
import "./../App.css"

type Header = Array<string>; 
const header:Header = [];
for(let keys in data[0]){
    header.push(keys);
}

let fixCol = {

};


const FixedPane = ()=>{

}
const FloatingPane = ()=>{}

function VsGrid() {
    const [state,setState] = useState("ltr");
    const [col,setCol] = useState(0);
    const handleClick=()=>{
        if(state === "ltr"){
            setState("rtl");
        }
        else{
            setState("ltr");
        }
    }
    const handleScroll=(props)=>{
        setCol(props.scrollLeft+0)
        console.log(col)
    }

    const Cell=({columnIndex, rowIndex, style})=>{
        //console.log(`rendered ${rowIndex} ${columnIndex}`)
        //console.log(style)
        if(rowIndex === 0){
            return (
                <div style={{...style}} className='cell-content '>
                    {header[columnIndex]}
                </div>
            )
        }
        else if(columnIndex === 0){
            return (
                <div style={{...style,overflowX:"hidden",position:'sticky',zIndex:5}} className='cell-content'>
                    {console.log(style)}
                    {console.log({...style,left:`${col}`,zIndex:1,position:"fixed"})
                    }
                    {data[rowIndex][header[columnIndex]]}
                </div>
            )
        }
        else{
            return (
                <div style={{...style,position:"absolute"}} className='cell-content'>
                    {data[rowIndex][header[columnIndex]]}
                </div>
            )
        }
        /*return (<div style={style} className='cell-content'>
            {rowIndex == 0?header[columnIndex]:data[rowIndex][header[columnIndex]]}
        </div>)*/
    }



    return (
    <>
        <button onClick={handleClick}>change to {state === "ltr"?"rtl":"ltr"}</button>
    
        <VariableSizeGrid
        direction={state}
        columnCount={header.length}
        columnWidth={index => 100}
        height={500}
        rowCount={data.length+1}
        rowHeight={index => 50}
        width={500}
        onScroll={handleScroll}
        
        >
            {Cell}
        </VariableSizeGrid>
    
    </>
  )
}

export default VsGrid