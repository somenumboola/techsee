import React, { Component } from "react";
import Page, {Grid, GridColumn} from "@atlaskit/page";
import SearchForm from "./Form";
import TestersTable from "./TestersTable";
import Banners from "./Banners";
import "./App.css";
import fetchJsonp from "fetch-jsonp";

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isError: false,
            bannerState: "",
            bannerText: "",
            rows: [
             /*   {
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
*/
            ]
        }
    }

    handleError(message) {
        this.setState({
            isLoading: false,
            isError: true,
            bannerState: "error",
            bannerText: message
        })
    }

    handleClear = () => {
        this.setState({
            isLoading: false,
            isError: false,
        });
    };

    sayHello(query) {
        const headers = new Headers();
        headers.append("Access-Control-Request-Method", "GET");
        headers.append("Access-Control-Request-Headers", "Content-Type");
        /*
        return fetch("https://test-api.techsee.me/api/ex/" + encodeURIComponent(query), {
            headers,
            method: "OPTIONS",
            mode: "cors"
        });
        */
        return Promise.resolve();
    }

    handleFetch = (val) => {
        this.setState({
            isLoading: true
        });
        this.sayHello(val).then(() => {
            /*
            console.log("options done");*/
            const headers = new Headers();
            headers.append("Accept", "text/plain,text/html,application/xhtml+xml,application/json,text/json,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8");
             headers.append("Accept-Language", "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6");
            // headers.append("Content-Type", "text/plain");
            return fetch("https://test-api.techsee.me/api/ex/" + val, {reffererPolicy: "origin-when-cross-origin", mode: "cors", headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Accept": "application/json",
                    'Access-Control-Request-Method': 'GET',
                    'Access-Control-Request-Headers': 'accept, accept-encoding, x-session-token, content-type',
                    'Origin': 'http://localhost:3000',
                    'X-ContentType': 'text/plain',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Connection': 'keep-alive',
                    'Accept-Encoding': 'gzip,deflate,br'
                }}).then(status).then((response) => {
                if (response.headers.get("content-type") === "application/json") {
                    return response.json();
                } else {
                    throw new Error();
                }
            });
        }, (err) => {console.log('options rejected', err)}).then((resp) => {

        }, () => {}).catch((err) => {console.error(err)});

    };
  render() {
    return (
        <Page>
          <Grid medium={12}>
              <GridColumn medium={8}>
                  <SearchForm onClick={this.handleFetch} isError={this.state.isError} isLoading={this.state.isLoading}/>
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
