import React, { Children, createElement, forwardRef, useMemo } from 'react'
import "./../Grid.css"
import { data } from '../data/MOCK_DATA'
import { FixedSizeGrid, FixedSizeGridProps } from 'react-window';


const header: Array<string> = [];
for(let keys in data[0]){
  header.push(keys);
}

const Cell = ({columnIndex,rowIndex,style})=>{

  return <div style={style} className="cell-content">
    {rowIndex?data[rowIndex-1][header[columnIndex]]:header[columnIndex]}
  </div>
}

const useInnerElementType=(cell,columnWidth,rowHeight)=>{
  //console.log(cell)

  return useMemo(()=>forwardRef((props,ref)=>{
    const children = Children.map(props.children,(child)=>{
      const column = child.props.columnIndex
      const row = child.props.rowIndex
      if(column === 0 || row === 0){
        return null;
      }
      return child;
    });

    
    //console.log(props.children[0].props)
    //console.log(props.children[props.children.length-1].props)
    const idx = {
      from:{
        rowIndex : props.children[0].props.rowIndex,
        columnIndex: props.children[0].props.columnIndex,
      },
      to:{
        rowIndex : props.children[props.children.length-1].props.rowIndex,
        columnIndex: props.children[props.children.length-1].props.columnIndex,
      }
    }

    children.push(createElement(cell,{
      key: `${0}:${0}`,
      rowIndex:0,
      columnIndex:0,
      style: {
        width:columnWidth,
        height:rowHeight,
        display:"inline-flex",
        position: "sticky",
        top: 0,
        left:0 , 
        zIndex: 4
      }
    }))

    for(let i=idx.from.columnIndex+1;i<=idx.to.columnIndex;i++){
      children.push(createElement(cell,{
        key: `${0}:${i}`,
        rowIndex:0,
        columnIndex:i,
        style: {
          display: "inline-flex",
          marginLeft:(i === idx.from.columnIndex+1?(i-1)*columnWidth:undefined),
          width:columnWidth,
          height:rowHeight,
          position: "sticky",
          top: 0,
          zIndex: 3
        }
      }))
    }

    for(let i=idx.from.rowIndex+1;i<=idx.to.rowIndex;i++){
      children.push(createElement(cell,{
        key: `${i}:${0}`,
        rowIndex:i,
        columnIndex:0,
        style: {
          marginTop:(i === idx.from.rowIndex+1?(i-1)*rowHeight:undefined),
          width:columnWidth,
          height:rowHeight,
          position: "sticky",
          left: 0,
  
          zIndex: 2
        }
      }))
    }
    return <div ref={ref} {...props}>{children}</div>
  }),[cell,columnWidth,rowHeight])
}
function Grid() {
  return (
    <>
      <div>
        <FixedSizeGrid
        columnCount={header.length}
        columnWidth={50}
        height={500}
        rowCount={data.length+1}
        rowHeight={30}
        width={500}
        innerElementType={useInnerElementType(Cell,50,30)}
        children={Cell}
        />
      </div>
    </>
  )
}

export default Grid