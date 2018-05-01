pragma solidity ^0.4.18;
import "./OraclizeApi.sol";

contract RandomNumberOracle is usingOraclize {

  string public numberGenerated;
  bytes32 public oraclizeID;

  function generateRandamNumber() payable public {
    oraclizeID = oraclize_query("WolframAlpha", "random number");
  }

  function __callback(bytes32 _oraclizeID, string _result) public {
    if(msg.sender != oraclize_cbAddress()) throw;
    numberGenerated = _result;
  }
}
