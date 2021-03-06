const hre = require('hardhat');

async function main() {
    const Hello = await ethers.getContractFactory("Hello");
    const hello = await Hello.deploy();

    console.log("address", hello.address);
    await hello.setHello("Hi Gym!");
    console.log("Get Hello: ", await hello.getHello());
}

main().then( () => process.exit(0))
    .catch( error => {
        console.log(error);
        process.exit(1);
    })