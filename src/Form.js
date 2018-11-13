import React, { Component } from "react";

import TextField, {FieldTextStateless}  from "@atlaskit/field-text";
import Button from "@atlaskit/button";
import {FormFooter} from "@atlaskit/form";

export default class SearchForm extends Component {

    MAX_LENGTH = 12;
    MIN_LENGTH = 2;

    constructor() {
        super();
        this.state = {
            isInvalid: false,
            searchQuery: ""
        }
    }

    onClear = () => {
        this.setState({
            searchQuery: "",
            isInvalid: false
        });
        if (this.props.onClear) {
            this.props.onClear();
        }
    };

    onQueryChange = (e) => {
        this.setState({
            searchQuery: e.target.value,
            isInvalid: !this.valid()
        });
    };

    handleFetch = () => {
        if (!this.state.isInvalid) {
            this.props.onClick(this.state.searchQuery);
        }
    };

    valid() {
        const length = this.state.searchQuery.length;
        return !(length < this.MIN_LENGTH || length > this.MAX_LENGTH);
    }

    render() {
        return (<span>
            <h1>Search bugs</h1>
                <FieldTextStateless isInvalid={this.state.isInvalid} onKeyUp={this.reValidate} onChange={this.onQueryChange} onBlur={this.reValidate} value={this.state.searchQuery} label="Tester Name" placeholder="Enter the tester name..."/>
                <FormFooter>
                    <Button isDisabled={this.state.isInvalid} isLoading={this.props.isLoading} onClick={this.handleFetch} appearance={"primary"}>Fetch</Button>&nbsp;
                    <Button isDisabled={this.props.isLoading && !this.props.isError} onClick={this.onClear} appearance={"subtle"}>Clear</Button>
                    </FormFooter>
            </span>
        );
    }
}