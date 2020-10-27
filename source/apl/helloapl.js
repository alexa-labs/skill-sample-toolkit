// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

import * as React from 'react';
import { APL, MainTemplate, Container, Text } from 'ask-sdk-jsx-for-apl';

export class HelloAplDocument extends React.Component {
    constructor(props) {
        super(props);
        this.launchMessage = 'Hello World!';
    }
    render() {
        return (
            <APL theme="dark">
                <MainTemplate>
                    <Container
                        alignItems="center"
                        justifyContent="spaceAround">
                        <Text
                            text={this.launchMessage}
                            fontSize="50px"
                            color="rgb(0,202,255)" />
                    </Container>
                </MainTemplate>
            </APL>
        );
    }
}