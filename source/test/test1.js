// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

const { ControlHandler, SkillTester, waitForDebugger, TestInput } = require("ask-sdk-controls");
const { expect } = require("chai");
const { suite, test } = require("mocha");
const { HelloManager } = require("..");

waitForDebugger();

suite("all", () => {
    test("launch", async () => {
        const tester = new SkillTester(new ControlHandler(new HelloManager()));
        const testResponseObj = await tester.testTurn("U: __", TestInput.launchRequest(), "A: Welcome, you can say Hello or Help. Which would you like to try?");
        expect(testResponseObj.response.shouldEndSession).equals(false);
    });

    test("HelloIntent", async () => {
        const tester = new SkillTester(new ControlHandler(new HelloManager()));
        const testResponseObj = await tester.testTurn("U: Hi", TestInput.of('HelloIntent'), "A: Hello World!");
        expect(testResponseObj.response.shouldEndSession).equals(true);
    });
});
