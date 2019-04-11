pragma solidity >=0.4.21 <0.6.0;

contract Farmer{

	struct category{
		uint32 catId;
		uint32 amountSold;
		uint32 income;
		uint32 price;
		string catName;
		string cowsKind;
	}

	struct milk{
		uint32 milkId;
		uint32 categoryId;
		uint32 quantity;
		uint32 sold;
		uint32 exportAt;
	}

	event getCategoryId(
	    uint32 categoryId
  	);

	event getMilkId(
	    uint32 milkId
  	);

	mapping(address => mapping(uint32 => category)) milkCategory;
	
	mapping(address => mapping(uint32 => milk)) milkInfo;
	 	
    function addCategory (string calldata name, string calldata cow, uint32 income, uint32 price) external {
        uint32 catId = uint32(now);
    	milkCategory[msg.sender][catId] = category(catId,0,income,price,name,cow);
    	emit getCategoryId(catId);
    }
    
    function getCategory(address farm,uint32 catId) external view returns(uint32,uint32,uint32,string memory,string memory) {
    	category memory catInfo = milkCategory[farm][catId];
    	return (catInfo.amountSold,catInfo.income,catInfo.price,catInfo.catName,catInfo.cowsKind);
    }

    function addMilkInfo(uint32 categoryId, uint32 quantity) external {
    	uint32 milkId = uint32(now);
    	milkInfo[msg.sender][milkId] = milk(milkId,categoryId,quantity,0,0);
    	emit getMilkId(milkId);
    }

    function getMilkInfo(address farm,uint32 milkId) external view returns(uint32 ,uint32 ,uint32 ,uint32 ,uint32) {
    	milk memory infomation = milkInfo[farm][milkId];
    	return (infomation.milkId,infomation.categoryId,infomation.quantity,infomation.sold,infomation.exportAt);
    }

}