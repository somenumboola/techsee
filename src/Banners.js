import React, { Component } from "react";
import WarningIcon from "@atlaskit/icon/glyph/warning";
import Banner from "@atlaskit/banner";

const IconWarn = <WarningIcon label="Warning icon" secondaryColor="inherit" />;


export default class Banners extends Component {
    render() {
        return (
            <span className="spaced">
                <Banner icon={IconWarn} isOpen={this.props.mode === "error"} appearance={this.props.mode}>{this.props.content}</Banner>
            </span>
        );
    }
}