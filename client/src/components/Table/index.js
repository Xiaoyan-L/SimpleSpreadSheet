import React, { Component } from "react";
import Header from "./Header";
import Row from "./Row";
import { getData } from "../../api";
import { Popover, PopoverBody } from "reactstrap";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[]],
      isDataLoad: 1, // set load data flag
      errorMsg: "",
      popover: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    getData()
      .then(res => {
        this.setState({
          data: res.data,
          isDataLoad: -1 * this.state.isDataLoad
        });
      })
      .catch(err => {
        this.setState({
          errorMsg: 'load data error',
          popover: true
        })
      });
  };

  afterCellUpdate = () => {
    this.loadData();
  };

  render() {
    const { data, isDataLoad } = this.state;
    return (
      <table className="table table-bordered">
        <thead>
          <Header col={data.length} />
        </thead>
        <tbody id="tb">
          {data.map((ele, idx) => (
            <Row
              key={idx}
              row={idx}
              data={ele}
              isDataLoad={isDataLoad}
              loadData={this.afterCellUpdate}
            />
          ))}
        </tbody>
        <Popover
          className="border border-danger"
          placement="right"
          isOpen={this.state.popover}
          target="tb"
        >
          <PopoverBody>{this.state.errorMsg}</PopoverBody>
        </Popover>
      </table>
    );
  }
}

export default Table;
