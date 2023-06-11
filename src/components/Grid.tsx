import React from 'react';
import { FixedSizeGrid } from 'react-window';

const GridContainerStyle = {
  display: 'flex',
  overflowX: 'auto',
};

const FirstColumnStyle = {
  position: 'sticky',
  left: 0,
  zIndex: 1,
  backgroundColor: 'white',
};

const CellStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
};

const Grid = () => {
  const rowCount = 100;
  const columnCount = 100;

  const renderCell = ({ columnIndex, rowIndex, style }) => {
    const isFixedColumn = columnIndex === 0;
    const isFixedRow = rowIndex === 0;
    const cellContent = isFixedColumn ? `Row ${rowIndex}` : `Cell ${columnIndex}-${rowIndex}`;

    return (
      <div style={style}>
        {isFixedColumn ? (
          <div style={FirstColumnStyle}>{cellContent}</div>
        ) : (
          <div style={CellStyle}>{cellContent}</div>
        )}
      </div>
    );
  };

  return (
    <div style={GridContainerStyle}>
      <div style={FirstColumnStyle} />
      <FixedSizeGrid
        columnCount={columnCount - 1} // Exclude the first fixed column
        rowCount={rowCount}
        columnWidth={100}
        rowHeight={30}
        width={500}
        height={300}
        itemKey={({ columnIndex, rowIndex }) => `${columnIndex + 1}-${rowIndex}`} // Adjust the column index
        itemData={{}}
      >
        {renderCell}
      </FixedSizeGrid>
    </div>
  );
};

export default Grid;
