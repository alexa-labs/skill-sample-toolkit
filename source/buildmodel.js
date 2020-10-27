// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

const { ControlInteractionModelGenerator, Logger } = require('ask-sdk-controls');

const log = new Logger('HelloWorld:InteractionModel');

new ControlInteractionModelGenerator()
    .withInvocationName('hello world')
    .addIntent({ name: 'AMAZON.StopIntent' })
    .addIntent({ name: 'AMAZON.NavigateHomeIntent' })
    .addIntent({ name: 'AMAZON.HelpIntent' })
    .addIntent({ name: 'AMAZON.CancelIntent' })

    // Add a custom intent
    .addIntent({ name: 'HelloIntent', samples: [
        "hello",
        "how are you",
        "say hello world",
        "say hi",
        "hi",
        "say hello world",
        "say hello"
    ]})

    // Build and write
    .buildAndWrite('../skill-package/interactionModels/custom/en-US.json');

log.info('Wrote en-US.json');