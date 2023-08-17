// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract YFUtechne is ERC721, ERC721Enumerable, Ownable {
    uint256 constant internal MAX_SUPPLY = 3000;
    uint256 constant internal PRICE = 0.0444 ether; // 44400000000000000
    uint256 public tokenCount = 0;
    address payable public depositAddress;
    bool public transfers_frozen = true;
    string public baseURI;

   constructor(address payable adminAddress, string memory initialBaseURI) ERC721("YFU Techne", "YFU_1") {
        baseURI = initialBaseURI;
        depositAddress = adminAddress;
    }

    function setBaseUri(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }

    function setDepositAddress(address payable to) external onlyOwner {
        depositAddress = to;
    }

    function unfreezeTransfers() external onlyOwner {
        transfers_frozen = false;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function safeMint(address to) external payable {
        require(tokenCount < MAX_SUPPLY, "Maximum token supply reached");
        require(msg.value == PRICE, "Invalid amount");
        tokenCount = tokenCount + 1;
        _safeMint(to, tokenCount);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = depositAddress.call{value: balance}("");
        require (success, "ETH transfer failed");
    }

    function withdrawTokens(IERC20 token) external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(depositAddress, balance));
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        if (address(0) == from) {
            return;
        }
        require(!transfers_frozen, "Transfers are paused");
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
