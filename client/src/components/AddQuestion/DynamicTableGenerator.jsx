import React, { useState } from 'react';
import { Table, Button, Switch, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const DynamicTableGenerator = ({
  tableData,
  setTableData,
  rowCount,
  setRowCount,
  colCount,
  setColCount,
}) => {
  const [showTableInputs, setShowTableInputs] = useState(false);

  const generateTable = () => {
    const newTableData = [];
    for (let i = 0; i < rowCount; i++) {
      const rowData = {};
      for (let j = 0; j < colCount; j++) {
        rowData[`col${j}`] = ""; // Initialize columns with empty values
      }
      rowData.id = uuidv4(); // Generate a unique ID for each row
      newTableData.push(rowData);
    }
    setTableData(newTableData);
  };

  const handleCellValueChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    setTableData((prevTableData) => {
      const updatedTableData = [...prevTableData];
      updatedTableData[rowIndex][`col${colIndex}`] = value;
      return updatedTableData;
    });
  };

  const columns = Array.from({ length: colCount }, (_, colIndex) => ({
    title: "",
    dataIndex: `col${colIndex}`,
    render: (_, record, rowIndex) => (
      <Input
        style={{ padding: 8 }}
        value={record[`col${colIndex}`]}
        onChange={(e) => handleCellValueChange(e, rowIndex, colIndex)}
      />
    ),
  }));

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Switch onChange={(checked) => setShowTableInputs(checked)} />
        {showTableInputs && (
          <div className="input-row-col">
            <Input
              placeholder="Rows"
              type="number"
              style={{ width: 80, marginRight: 8 }}
              value={rowCount}
              onChange={(e) => setRowCount(Number(e.target.value))}
            />
            <Input
              placeholder="Cols"
              type="number"
              style={{ width: 80, marginRight: 8 }}
              value={colCount}
              onChange={(e) => setColCount(Number(e.target.value))}
            />
            <Button onClick={generateTable}>Generate Table</Button>
          </div>
        )}
      </div>
      {showTableInputs && (
        <Table
          className="dynamic-table"
          dataSource={tableData}
          columns={columns}
          rowKey="id"
          pagination={false}
          showHeader={false} // Hide column headers
        />
      )}
    </div>
  );
};

export default DynamicTableGenerator;
