# ASK Toolkit Demo Skill

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Visual Studio Code](https://code.visualstudio.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-toolkit/).
*  An Alexa device (e.g. Amazon Echo) or the simulator

## What you Get
This is a demo showing how to do code-first Alexa Skills development with the [ASK Toolkit](https://alexa.design/toolkit). It's meant as companion code for [this blog post](https://developer.amazon.com/en-US/blogs/alexa/alexa-skills-kit/2020/10/code-first-alexa-skill-development-with-vs-code-and-the-ask-sdk-controls-framework) which is deployed as an [Alexa Hosted Skill](https://alexa.design/ahs).

## Setting Up the Demo
This code is meant to be used as code snippets as you develop a Hello World skill [in this blog post](https://developer.amazon.com/en-US/blogs/alexa/alexa-skills-kit/2020/10/code-first-alexa-skill-development-with-vs-code-and-the-ask-sdk-controls-framework). However you can still deply this skill as self hosted following these steps in your command line prompt:

1. Clone this project with git
2. Open a command line prompt in the project root directory and do:
    - cd source
    - npm install
    - npm run buildmodel (optional)
    - npm run build
    - cd ../lambda
    - npm test (optional)
    - cd ..
    - ask deploy

## Running the Demo
Just say or type "Alexa, open Hello World"

## Resources
* [ASK Toolkit](https://alexa.design/toolkit)

## License

This library is licensed under the Amazon Software License.
