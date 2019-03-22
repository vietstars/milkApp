pragma solidity >=0.4.21 <0.6.0;

import "./Migrations.sol";

contract DalatMilk is Migrations {

	struct Info{
		string name;
		string location;
		bytes32 secret;
		uint8 position;
		uint16 long;
		uint16 lat;
	}

	mapping(address=>Info) public info;
	
  	function createSecret(string calldata _secret) external restricted returns (bool) {
  	    info[msg.sender] = Info('','',keccak256(abi.encodePacked(_secret)),0,0,0);
  	    return true;
  	}
  	function checkSecret(string memory _secret) public view restricted returns (bool) {
  	    if(keccak256(abi.encodePacked(_secret)) == info[msg.sender].secret)
  	    	return true;
  	    else
  	        return false;
  	}
}