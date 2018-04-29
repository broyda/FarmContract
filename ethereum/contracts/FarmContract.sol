pragma solidity ^0.4.18;

contract FarmContract{
    address public owner;
    string  latitude; // The latitude (say, the mean approx. latitude)
    string longitude; // The latitude (say, the mean approx. latitude)
    uint  coverageAmount; // Coverage required for this contract.
    uint  listedPrice; // Amount ready to pay by creator/owner for contract to be covered
    address public insurer; // Insurer for this contract
    bool contractedByInsurer; //Bool ind to know whether contract is insured by insurer.

    mapping(address => uint) public listOfBidders;//List of bidder with bidding price
    uint public numberOfBidders; //Total number of bidders on this contract

    function FarmContract(string _latitude, string _longitude,
    uint _coverageAmount,  uint _listedPrice) public {
        owner = msg.sender;
        latitude = _latitude;
        longitude = _longitude;
        coverageAmount = _coverageAmount;
        listedPrice = _listedPrice;
    }

    //Tobe invoked by insurers with bidding amount for the contract
    function bid(uint amount) biddingRules(amount) checkInsurer public {
        if(listOfBidders[msg.sender] == 0){
             numberOfBidders++;
        }
        listOfBidders[msg.sender] = amount;
    }

    //to be invoked by owner to select list of contracts
    function chooseBidder(address _bidderAddress) onlyOwner checkInsurer public payable{
        require(listOfBidders[_bidderAddress] != 0);
        require(msg.value >= listOfBidders[_bidderAddress]);
        insurer = _bidderAddress;
    }

    //to be invoked by Insurer to accept the contract
    function acceptContract() public payable{
        require(contractedByInsurer == false);
        require(msg.sender == insurer);
        require(msg.value >= coverageAmount);
        insurer.transfer(listOfBidders[msg.sender]);
        contractedByInsurer = true;
    }

    function contractBalance() view public returns(uint){
        return this.balance;
    }

    function transferContract(address newOwner) onlyOwner public{
        owner = newOwner;
    }

    modifier biddingRules(uint bidPrice){
        require(bidPrice > 0);
        require(insurer == 0);
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier checkInsurer(){
        require(insurer == 0);
        _;
    }
}


contract FarmFactoryContract{
    mapping(address => address) public contractAddresses;

    function createFarmContract(string _latitude, string _longitude,
    uint _coverageAmount,  uint _listedPrice) public returns (address) {
        address farmContractAddress = new FarmContract(_latitude, _longitude, _coverageAmount, _listedPrice);
        contractAddresses[msg.sender] = farmContractAddress;
        return farmContractAddress;
    }
}
