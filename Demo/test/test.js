const { expect } = require("chai");
const { ethers } = require("hardhat");

describe( "Hello", () => {
    it("should return Hello", async () => {
        const Hello = await ethers.getContractFactory("Hello");
        const hello = await Hello.deploy();

        expect( await hello.getHello()).to.equals("Hello")
    });
});
