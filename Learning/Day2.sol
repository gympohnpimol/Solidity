//SPDX-License-Identifier: UNLICENSED;

pragma solidity 0.8.0;

contract Day2 {
    
    string [] text;
    
    constructor() {
        text.push("Hello World");
        // text[0] = "Hello World";
    }
    
    function setTextMemory() public {
        string memory str1;
        str1 = text[0];
    }
    
    function setTextStorage() public {
        string storage str2;
        str2 = text[0];
    }
}
