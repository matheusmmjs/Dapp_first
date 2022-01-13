const ApprovalContract = artifacts.require('../../contracts/ApprovalContract.sol');

contract('ApprovalContract', (accounts) => {
  console.log(accounts);

  it('initiates contract', async () => {
    const contract = await ApprovalContract.deployed();

    const approverResult = await contract.approver.call();
    console.log('Approver result:', approverResult);

    assert.equal(
      approverResult,
      0x5984F236f4a3E07e9D1F768f8828490edCDF43C9,
      "approvers don't match"
    )
  });

  it('takes a deposit', async () => {
    const contract = await ApprovalContract.deployed();

    const depositResult = await contract.deposit(
      accounts[0],
      { value: 1e+18, from: accounts[1] }
    );
    console.log('Deposit result:', depositResult);

    const balanceResult = await web3.eth.getBalance(contract.address);
    console.log('Balance result:', balanceResult);

    assert.equal(
      balanceResult,
      1e+18,
      "amount did not match"
    );
  });

  it(`to make a transaction when approved, approver: ${accounts[2]}`, async () => {
    const contract = await ApprovalContract.deployed();

    const depositResult = await contract.deposit(
      accounts[0],
      { value: 1e+18, from: accounts[1] }
    );
    console.log('Deposit result:', depositResult);

    const approveResult = await contract.approve({ from: accounts[2] });
    console.log('Approve result:', approveResult);

    const balanceResult = await web3.eth.getBalance(contract.address);
    console.log('Balance result:', balanceResult);

    assert.equal(
      balanceResult,
      0,
      "didn't transfer ether"
    );
  });
})
