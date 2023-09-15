# RWeb3 Documentation

## Overview

`RWeb3` is a custom web3 structure designed to facilitate interactions with blockchain networks. It extends from `RWeb3Context` and offers various functionalities crucial for DApp development.

## Table of Contents

- [Features](#features)
- [Details](#details)
    - [Version Information](#version-information)
    - [Modules Incorporation](#modules-incorporation)
    - [Provider Integration](#provider-integration)
    - [Contract Building](#contract-building)
    - [Rigo Module Usage](#rigo-module-usage)
- [Usage](#usage)

## Features

1. Version Information
2. Modules Incorporation
3. Provider Integration
4. Contract Building
5. Rigo Module Usage

## Details

### Version Information

Access the current version of the `RWeb3` library:
```javascript
RWeb3.version
```

### Modules Incorporation

RWeb3 integrates various modules for ease. You can access these modules through:

```javascript
RWeb3.modules
```

For instance, the RWeb3Rigo module can be retrieved using:

```javascript
RWeb3.modules.RWeb3Rigo
```

Provider Integration
When initializing, the RWeb3 class can accept a provider. If omitted or an empty string is passed, a warning will be shown.

Contract Building
Within RWeb3 is the ContractBuilder class, which allows users to initiate a contract context. It extends from the base Contract class and requires a JSON interface along with an optional address or context.

Rigo Module Usage
The RWeb3 class integrates the RWeb3Rigo module, offering diverse functionalities. Access the module, accounts, and contract builder using the rigo attribute of an RWeb3 instance.

Usage

Initialize an instance of RWeb3:

```javascript
  const rweb3 = new RWeb3('http://localhost:8545')
```
