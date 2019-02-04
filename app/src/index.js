import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import $ from 'jquery'; 


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    $.ajax({
       url: "http://localhost:8080/books",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {
         
         this.setState({data: data});
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
       }.bind(this)
    })
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.name
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  id: "progress",
                  accessor: d => d.progress
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
