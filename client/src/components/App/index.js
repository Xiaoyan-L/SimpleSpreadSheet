import React, { Component } from "react";
import "./App.css";
import Table from "../Table";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table />
        <article className='text-left ml-5 mt-5'>
          <h5 className='text-danger'>* Accepted Input</h5>
          <p>1. number, string</p>
          <p>2. cell addition like '=A1+B1'</p>
          <p>3. numeric addition like '=1+0.2'</p>
        </article>
      </div>

    );
  }
}

export default App;
