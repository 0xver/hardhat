# Hardhat

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

### Hardhat-based boilerplate for smart contract development

A Hardhat boilerplate that comes pre-configured with essential settings and plugins, simplifying the process for developers to get started quickly. Developers can streamline smart contract workflow by utilizing built-in scripts for testing, linting, and deployment.

## Installation

Install with [**npm**](https://www.npmjs.com):

```
npm install
```

## Usage

Start the local blockchain network

```
npm start -s
```

Compile smart contracts

```
npm run compile -s
```

Test smart contracts

```
npm test -s
```

Deploy smart contracts to local network by first configuring `hardhat.config.js`

```js
// hardhat.config.js

defaultNetwork: "localhost"
```

Deploy smart contracts after `hardhat.config.js` configuration

```
npm run deploy -s
```

Lint Solidity and JavaScript files

```
npm run lint -s
```

Format Solidity and JavaScript files

```
npm run format -s
```

## Resources

Smart contract development resources:

- [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#overview)
- [Solver](https://github.com/0xver/solver)
- [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
