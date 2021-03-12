pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
  
    function enter() public payable{
        require(msg.value > 0.01 ether);        
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {  // only manager can pick a winner
        uint index = random() % players.length; // pick a player
        players[index].transfer(address(this).balance); // send him the total current balance
        players = new address[](0); //reset players list
    }
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[]){
        return players;
    }
}