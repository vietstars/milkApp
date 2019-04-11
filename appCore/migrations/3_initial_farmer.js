const Farmer = artifacts.require("Farmer");

module.exports = function(deployer) {
  deployer.deploy(Farmer);
};
