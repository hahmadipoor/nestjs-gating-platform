pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private deployer;

    constructor() ERC721("GameItem", "ITM") {
        deployer=msg.sender;
    }

    function isDeployer(address a) public view returns (bool){
        if(a==deployer){
            return true;
        }else {
            return false;
        }
    }

    function awardItem(address player, string memory tokenURI) public returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }
}

//account 1: 0xd49628a00b65163F368427D0ECa45bed59241A37
//account 2: 0x47B22625eA400ff7eB7f133B856CFC9C307c8d65
//contract address: 0x17EB4d45619535BDd2128b7b0D921cD358245d1b
