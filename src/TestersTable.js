import React, { Component } from "react";
import styled from "styled-components";
import DynamicTable from "@atlaskit/dynamic-table";

const Wrapper = styled.div`
  min-width: 600px;
`;

const NoResultPlaceholder = <h2>No matching results found</h2>;
const ErrorResultPlaceholder = <h2>Error occured. Please check message above.</h2>;


export default class TestersTable extends Component {

    generateHeadings() {
        return {
            cells: [
                {
                    key: "fname",
                    content: "Firts Name",
                    isSortable: true
                },
                {
                    key: "lname",
                    content: "Last Name",
                    isSortable: true
                },
                {
                    key: "country",
                    content: "Country",
                    isSortable: true
                },
                {
                    content: "Bugs",
                    isSortable: false
                }
            ]
        }
    }

    getHeading() {
        return "List of matching results"
    }

    getBugs(bugs) {
        if (!bugs || !bugs.length) {
            return "";
        }
        return bugs
            .map((bug, index) => {
                return (<span key={index}>{bug.title}</span>);
            }).reduce((prev, curr)=> {
                return [prev, ", ", curr];
            });
    }

    get rows() {
        return this.props.rows.map((item, index) => {
            return {
                key: `row-${index}-${item.firstName}`,
                cells: [
                    {
                        key: `fname-${item.firstName}-${index}` ,
                        content: item.firstName
                    },
                    {
                        key: `fname-${item.lastname}-${index}`,
                        content: item.lastName
                    },
                    {
                        key: `country-${item.country}-${index}`,
                        content: item.country
                    },
                    {
                        content: (this.getBugs(item.bugs))
                    }
                ]
            }
        });
    }

    render() {
        return (<Wrapper>
            <DynamicTable
                caption={this.getHeading()}
                head={this.generateHeadings()}
                rows={this.rows}
                rowsPerPage={20}
                defaultPage={1}
                loadingSpinnerSize="large"
                isLoading={this.props.isLoading}
                emptyView={this.props.isError ? ErrorResultPlaceholder : NoResultPlaceholder}
                isFixedSize
                defaultSortKey="fname"
                defaultSortOrder="ASC"
                onSort={() => console.log('onSort')}
                onSetPage={() => console.log('onSetPage')}
            />
        </Wrapper>);
    }
}