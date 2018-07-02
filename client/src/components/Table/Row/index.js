import React from "react";
import Cell from "./Cell";

const Row = props => {
  return (
    <tr>
      <td className="text-center text-white bg-info">{props.row + 1}</td>
      {props.data.map((ele, idx) => (
        <Cell
          key={idx}
          row={props.row}
          col={idx}
          value={ele}
          isDataLoad={props.isDataLoad}
          loadData={props.loadData}
        />
      ))}
    </tr>
  );
};
export default Row;
