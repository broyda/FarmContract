pragma solidity ^0.4.17;

contract FarmContract {
    address public initiator;
    
    // Array containing the Domain struct (say the Farm agreement instances)
    /*
    struct FarmAgreement {
        address public holder; // The insured or in our world the 'trader'
        string latitude; // The latitude (say, the mean approx. latitude)
        string longitude; // The latitude (say, the mean approx. latitude)
        string meanElevationOverSeaLevel; // Perhaps required by the weather apis
        string value; // See if using premium makes more sense
        // An inner struct covering the perils (a la carte??)
        
        
    }
    
    
    */

    public FarmInsurance() public {
        // The global msg object
        initiator = msg.sender;
    }
}
