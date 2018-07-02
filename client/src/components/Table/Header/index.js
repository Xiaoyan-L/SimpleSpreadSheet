import React from "react";

const Header = props => {
  const colArr = [];
  let start = "A".charCodeAt(0);
  for (let i = 0; i < props.col; i++, start++) {
    colArr[i] = String.fromCharCode(start);
  }
  return (
    <tr className="text-white bg-info">
      <th />
      {colArr.map((ele, idx) => (
        <th className="text-center" key={idx}>
          {ele}
        </th>
      ))}
    </tr>
  );
};

export default Header;
