import React, { Component } from "react";
import Page, {Grid, GridColumn} from "@atlaskit/page";
import SearchForm from "./Form";
import TestersTable from "./TestersTable";
import Banners from "./Banners";
import "./App.css";
import DataManager from "./DataManager";

class App extends Component {
    constructor() {
        super();
        this.defaultErrorMessage = "Temporary error occured, please try again later!";
        this.dataManager = new DataManager(
            "https://test-api.techsee.me/api/ex/"
        );
        this.state = {
            isLoading: false,
            isError: false,
            bannerState: "",
            bannerText: "",
            rows: []
        }
    }

    handleError(message) {
        this.setState({
            isLoading: false,
            bannerState: "error",
            bannerText: message
        })
    }

    handleClear = () => {
        this.setState({
            isLoading: false,
            isError: false,
            bannerState: "",
            bannerText: ""
        });
    };

    handleFetch = (val) => {
        this.setState({
            isLoading: true
        });
        if (val.length === 0) {
            this.handleError("Can't send empty request!");
            setTimeout(() => {
                this.setState({
                    bannerText: "",
                    bannerState: "",
                    isLoading: false
                })
            }, 3000);
            return;
        }
        this.dataManager.fetch(val).then((response) => {
            if (response.status > 300 || response.status < 200) {
                this.handleError(this.defaultErrorMessage);
                return;
            }
            if (!response.data || !response.data.length) {
                this.setState({
                    rows: []
                });
                return;
            }
            this.setState({
                rows: response.data,
                isLoading: false
            })
        }, () => {
            this.handleError(this.defaultErrorMessage);
        }).catch((err) => {
            this.handleError(this.defaultErrorMessage);
        });
    };
  render() {
    return (
        <Page>
          <Grid medium={12}>
              <GridColumn medium={8}>
                  <SearchForm onClick={this.handleFetch} onClear={this.handleClear} isError={this.state.isError} isLoading={this.state.isLoading}/>
              </GridColumn>
              <GridColumn medium={4}>
                  <h2>Usage note</h2>
                  <p>Please type letters of suggested tester first name or type "all" to view full list.</p>
              </GridColumn>

              <GridColumn>
                  <Banners content={this.state.bannerText} mode={this.state.bannerState}/>
                  <br/>
                  <TestersTable rows={this.state.rows} isError={this.state.isError} isLoading={this.state.isLoading}/>
              </GridColumn>
          </Grid>
        </Page>
    );
  }
}

export default App;
