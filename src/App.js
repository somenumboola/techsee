import React, { Component } from "react";
import Page, {Grid, GridColumn} from "@atlaskit/page";
import SearchForm from "./Form";
import TestersTable from "./TestersTable";
import Banners from "./Banners";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            rows: [
                {
                    firstName: "Melissa",
                    lastName: "Dowson",
                    country: "Argentina",
                    bugs: [
                        {
                            id: 1,
                            title: "Sample bug"
                        },
                        {
                            id: 2,
                            title: "Yet one another bug"
                        },
                        {
                            id: 3,
                            title: "Some long long bug name"
                        }
                    ]
                }, {
                    firstName: "Johnathan",
                    lastName: "Arnhold",
                    country: "Israel",
                    bugs: []
                },
                {
                    firstName: "Andrew",
                    lastName: "Spencer",
                    country: "Israel",
                    bugs: []
                },
                {
                    firstName: "Bob",
                    lastName: "Spencer",
                    country: "Israel",
                    bugs: []
                }

            ]
        }
    }

    handleClick = (val) => {
        alert(val);

        this.setState({
            isLoading: true,
            bannerText: "Error occured",
            bannerState: "error"
        });
    };
  render() {
    return (
        <Page>
          <Grid medium={12}>
              <GridColumn medium={8}>
                  <SearchForm onClick={this.handleClick} isLoading={this.state.isLoading}/>
              </GridColumn>
              <GridColumn medium={4}>
                  <h2>Usage note</h2>
                  <p>Please type letters of suggested tester first name or type "all" to view full list.</p>
              </GridColumn>

              <GridColumn>
                  <Banners content={this.state.bannerText} mode={this.state.bannerState}/>
                  <br/>
                  <TestersTable rows={this.state.rows} isLoading={this.state.isLoading}/>
              </GridColumn>

          </Grid>
        </Page>
    );
  }
}

export default App;
