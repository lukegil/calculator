# calculator
A four function calculator

## Requirements
Node v8.9.1
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```

## Installation
```
cd {this repo}
npm install
```

## Run
```
npm start
```

## Test 
```
npm test
```

## Structure 
```
|-- calculator - All primary business logic
|---------- entry-point - Primary wrapper
|---------- parser - Parse a string into something readable 
|---------- arithmetic - Runs the actual statements
|---------- history - Allows user to use previous answer in current equation
|---------- errors - Custom errors
|
|-- data_store - Storage for history
|---------- data_store - A basic in memory object to save data. Override for greater functionality
|
|-- cli - Run on the command line
|---------- cli - Start using `npm start`
```

## Notes and Future Features

All logic is stored in the calculator module, allowing easy implementation of any other public APIs. 

The next obvious step is to allow multiple operators, followed by operator types. 

