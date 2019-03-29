pragma solidity >=0.4.21 <0.6.0;

contract Ownable {
  address private _owner;

  // event OwnershipTransferred(
  //   address indexed previousOwner,
  //   address indexed newOwner
  // );

  constructor() internal {
    _owner = msg.sender;
    // emit OwnershipTransferred(address(0), _owner);
  }

  function owner() public view returns(address) {
    return _owner;
  }

  modifier onlyOwner() {
    require(isOwner());
    _;
  }

  function isOwner() public view returns(bool) {
    return msg.sender == _owner;
  }

  // function renounceOwnership() public onlyOwner {
  //   emit OwnershipTransferred(_owner, address(0));
  //   _owner = address(0);
  // }

  // function transferOwnership(address newOwner) public onlyOwner {
  //   _transferOwnership(newOwner);
  // }

  // function _transferOwnership(address newOwner) internal {
  //   require(newOwner != address(0));
  //   emit OwnershipTransferred(_owner, newOwner);
  //   _owner = newOwner;
  // }
}

contract DalatMilk is Ownable {

    struct Profile{
        string name;
        string location;
        bytes16 secret;
        uint8 position;
        uint32 date;
    }
    
    mapping(address=>Profile) profile;

    function checkUser() external view returns(uint8 actor) {
        if(msg.sender == owner()){
          return 1;
        }else{
          return profile[msg.sender].position;
        }
    }

    function updateSecret(string memory secret) public onlyOwner {
        bytes16 _secret = _generatePass(secret);
        profile[owner()]= Profile('', '', _secret, 1, uint32(now));
    }

    function secretDeploy() external view returns(bool res) {
       return profile[owner()].secret != bytes16(0);
    }
    
    function getProfile(address _account) external view returns(string memory, string memory, uint8, uint32) {
        Profile memory _acc = profile[_account];
        return(_acc.name,_acc.location,_acc.position,_acc.date);
    }

    function userLogin(string calldata _key) external view returns(bool res) {
        return _generatePass(_key) == profile[msg.sender].secret;
    }
    
    
    function updateProfile(address userAdd,string memory name, string memory location, uint8 position, string memory secret) public {
        bytes16 _secret = _generatePass(secret);
        profile[userAdd]= Profile(name, location, _secret, position, uint32(now));
    }
    
    function checkSecret(string calldata _secret) external view onlyOwner returns(bool){
        return _generatePass(_secret)==profile[owner()].secret;
    }
    
    function _generatePass(string memory secret) private pure returns(bytes16) {
        return bytes16(keccak256(abi.encodePacked(secret)));
    }
    
}
