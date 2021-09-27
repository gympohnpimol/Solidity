//SPDX-License-Identifier: Nolicense

pragma solidity 0.8.7;

contract Parent {
    uint count;
    
    event Log(uint);
    constructor () {
        emit Log(0);
    }
    
    function foo() public pure virtual returns (uint) {
        return 0;
    }
    
    function foo(uint a) public pure returns (uint){
        // overload function
    }
    
    function foo(bool b, bytes memory x) public pure returns (uint){
        // overload function
    }
}

contract Child is Parent {
    function foo() public view virtual override returns (uint) {
        return 22;
    }
}

contract Child2 is Child {
    function foo() public view virtual override returns (uint) {
        return 33;
    }
}

contract Supers is Child2 {
    
    //Parent p = new Parent();
    
    function foo() public view override returns (uint) {
        //return p.foo();         //11
        return super.foo(); //33
    }
}

contract initialCount is Parent(5) {
    
    Parent p = new Parent(1);
    
    function foo() public view override returns (uint) {
        //return p.foo(); //1
        return Parent.foo(); //5
    }
}

contract Parent1 {
    event Log1(uint);
    
    constructor () {
        emit Log1(1);
    }
    
    function foo() public pure virtual returns (uint) {
        return 11;
    }
}

contract initialCount is Parent, Parent1 {
    
    Parent p = new Parent();
    
    constructor () Parent() Parent1() { 
        
    }
    
    function foo() public pure override(Parent, Parent1) returns (uint) {
        //return p.foo(); //1
        // return Parent.foo(); //5
        return super.foo(); // Select Right: Parent1
    }
}