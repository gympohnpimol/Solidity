//SPDX-License-Identifier: UNLICENSED;

pragma solidity 0.8.0;

contract Day4 {
    
    enum Status { PAID, UNPAID}
    
    struct Guitar {
        uint price;
        string model;
        Status status;
        address owner;
        
    }
    address payable owner;
    
    mapping (uint => Guitar) private guitars;
    
    event BuyGuitar(uint , string, bool);
    
    modifier checkCost (uint id) {
        require (msg.value >= guitars[id].price, "Not enought ether");
        _;
    }
    constructor() { //
        owner = payable(msg.sender);
    }
    
    function setGuitar(uint id, uint price, string memory model) public {
        guitars[id] = Guitar(price*10**18, model, Status.UNPAID, owner);
    }
    
    function getGuitar(uint id) public view returns (Guitar memory) {
        return guitars[id];
    }
    
    function buyGuitar(uint id) public payable checkCost(id) returns (Guitar memory) {
        guitars[id].status = Status.PAID;
        guitars[id].owner = msg.sender;
            
        (bool result,) = owner.call{ value: msg.value}("");
        
        emit BuyGuitar(id, guitars[id].model, result);
        
        return guitars[id];
        
    }
    
}
