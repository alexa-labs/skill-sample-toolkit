// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

const Alexa = require('ask-sdk-core');
const { InputUtil, ControlHandler, ControlManager, Control, ContainerControl, LiteralContentAct, renderActsInSequence } = require('ask-sdk-controls');
const React = require('react');
const { AplDocument } = require('ask-sdk-jsx-for-apl');
const { HelloAplDocument } = require('./apl/helloapl');

class LiteralContentControl extends Control {
    constructor(literalContent, endSession) {
        super(new.target.name);
        this.literalContent = literalContent;
        this.endSession = endSession;
    }
    handle(input, resultBuilder) {
        if(this.literalContent)
            resultBuilder.addAct(new LiteralContentAct(this, {promptFragment: this.literalContent}));
        if(this.endSession)
            resultBuilder.endSession();
    }
    canTakeInitiative() { return false; }
}

class AplControl extends LiteralContentControl {
    constructor(literalContent, endSession, aplDocument) {
        super(literalContent, endSession);
        this.aplDocument = aplDocument;
    }
    renderAct(act, input, responseBuilder) {
        if (!responseBuilder.isDisplayUsed()) {
            if (Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
                responseBuilder.addDirective(this.aplDocument.getDirective());
            }
        }
        return act.render(input, responseBuilder);
    }
}

class LauncRequestControl extends LiteralContentControl  {
    canHandle(input) { return InputUtil.isLaunchRequest(input); }
}

class HelloIntentControl extends AplControl {
    canHandle(input) { return InputUtil.isIntent(input, 'HelloIntent'); }
}

class HelpIntentControl extends LiteralContentControl {
    canHandle(input) { return InputUtil.isIntent(input, 'AMAZON.HelpIntent'); }
}

class StopOrCancelIntentControl extends LiteralContentControl {
    canHandle(input) { return InputUtil.isIntent(input, 'AMAZON.StopIntent') || InputUtil.isIntent(input, 'AMAZON.CancelIntent'); }
}

class SessionEndedRequestControl extends LiteralContentControl {
    canHandle(input) { return InputUtil.isSessionEndedRequest(input); }
}

class IntentReflectorControl extends Control {
    canHandle(input) { return input.request.type === 'IntentRequest'; }
    handle(input, resultBuilder) {
        resultBuilder.addAct(new LiteralContentAct(this, {promptFragment: `You just triggered ${input.request.intent.name}`}));
    }
    canTakeInitiative() { return false; }
}

class HelloControl extends ContainerControl {
    constructor(props) {
        super(props);
        this.addChild(new LauncRequestControl('Welcome, you can say Hello or Help. Which would you like to try?', false))
            .addChild(new HelloIntentControl('Hello World!', true, new AplDocument(<HelloAplDocument />)))
            .addChild(new HelpIntentControl('You can say hello to me! How can I help?', false))
            .addChild(new StopOrCancelIntentControl('Goodbye!', true))
            .addChild(new IntentReflectorControl('IntentReflectorControl'))
            .addChild(new SessionEndedRequestControl(null, false));
    }
}

class HelloManager extends ControlManager {
    createControlTree() { return new HelloControl({ id: 'HelloControl' }); }
}

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(new ControlHandler(new HelloManager()))
    .lambda();
exports.HelloManager = HelloManager;