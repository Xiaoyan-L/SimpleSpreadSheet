import React, { Component } from "react";
import { getDataByCell, updateCell } from "../../../../api";
import { testColumn, testNumber } from "../../../../utils/RegexTest";
import simpleCaculator from "../../../../utils/Caculator";
import { Popover, PopoverBody } from "reactstrap";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,  // original value
      realValue: "", // caculate value
      display: "", // display value
      errMsg: "", // error message
      popover: false, // pop error message
      inputStyle: "text-center" // edit: left, display: center
    };
    this.cellID = this.col2Letter(+this.props.col) + (this.props.row + 1); // like A0, B1
  }

  componentDidMount() {
    this.value2Display(); // compute the formula
  }

  componentDidUpdate(prevProps) {
    // if data reload, compute the formula 
    if (prevProps.isDataLoad !== this.props.isDataLoad) {
      this.value2Display();
    }
  }

  // compute the formula
  value2Display = () => {
    const { value } = this.state;
    if (value[0] === "=") {
      // numeric expression: 1+2
      // only support simply add, and substract
      if (testNumber(value)) {
        const result = simpleCaculator(value.substr(1));
        this.setState({
          realValue: result,
          display: result
        });
      } else {
        // Cell expression like A1+B1
        // only support add
        getDataByCell(this.cellID)
          .then(res => {
            this.setState({
              realValue: res.data,
              display: res.data
            });
          })
          .catch(err => {
            this.handleError("request data error");
          });
      }
    } else {
      this.setState({
        display: value,
        realValue: value
      });
    }
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
      display: e.target.value
    });
  };

  onFocus = () => {
    this.setState({
      display: this.state.value,
      inputStyle: ""
    });
  };

  onBlur = () => {
    const { value } = this.state;
    // value change, do update
    if (this.props.value !== value) {
      if (value[0] !== "=" || testColumn(value) || testNumber(value)) {
        updateCell(this.cellID, value)
          .then(res => {
            // reload data to sync other relate cell.
            this.props.loadData();
          })
          .catch(err => {
            this.handleError("update error");
          });
      } else {
        this.handleError("formula error");
      }
    } else {
      this.setState({
        display: this.state.realValue
      });
    }
    // set input centered when blur
    this.setState({
      inputStyle: "text-center"
    });
  };

  // set error message and popover it
  handleError = msg => {
    this.setState({
      errMsg: msg,
      popover: true
    });
  };

  // handle press enter
  onSubmit = e => {
    e.preventDefault();
    e.target.childNodes[0].blur();
  };

  // convert column number to A-Z
  col2Letter = col => {
    return String.fromCharCode("A".charCodeAt(0) + col);
  };

  // set popover false
  toggle = () => {
    this.setState({
      popover: false
    });
  };

  render() {
    return (
      <td>
        <form onSubmit={this.onSubmit}>
          <input
            id={this.cellID}
            type="text"
            className={this.state.inputStyle}
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={this.state.display}
            onFocus={this.onFocus}
          />
          <Popover
            className="border border-danger"
            placement="right"
            isOpen={this.state.popover}
            target={this.cellID}
            toggle={this.toggle}
          >
            <PopoverBody>{this.state.errMsg}</PopoverBody>
          </Popover>
        </form>
      </td>
    );
  }
}

export default Cell;
