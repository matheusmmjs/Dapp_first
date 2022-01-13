// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ApprovalContract {
  address public sender;
  address payable public receiver;
  address constant public approver = 0x5984F236f4a3E07e9D1F768f8828490edCDF43C9;

  function deposit(address payable _receiver) external payable {
    require(msg.value > 0, 'Value is less than 0');
    sender = msg.sender;
    receiver = _receiver;
  }

  function viewApprover() external pure returns(address) {
    return(approver);
  }

  function approve() external {
    require(msg.sender == approver, 'Message sender is different from approver');
    receiver.transfer(address(this).balance);
  }
}

