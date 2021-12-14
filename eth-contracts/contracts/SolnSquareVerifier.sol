// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './ERC721Mintable.sol';


interface IVerifier {
    function verifyTx(
        uint[2] memory a, 
        uint[2][2] memory b, 
        uint[2] memory c, 
        uint[2] memory input
    ) external view returns (bool r);
}


contract SolnSquareVerifier is CustomERC721Token {

    struct Solution {
        uint256 _index;
        address _address;
    }

    Solution[] private _solutions;
    mapping(uint256 => bool) private _uniqueSolutions;
    IVerifier private _verifier;

    event SolutionAdded(Solution indexed solution);

    constructor(address _address, string memory _name, string memory _symbol) 
        CustomERC721Token(_name, _symbol) 
    {
        _verifier = IVerifier(_address);
    }

    function _addSolution(Solution memory solution) internal {
        _solutions.push(solution);
        _uniqueSolutions[solution._index] = true;

        emit SolutionAdded(solution);
    }

    function mintVerifiedToken(uint256 tokenId) external {
        require(!_uniqueSolutions[tokenId], "Solution has already been used");
        // require(_verifier.verifyTx(a, b, c, input), "Verification failed");

        Solution memory sol = Solution({
            _index: tokenId, 
            _address: msg.sender
        });

        _addSolution(sol);
        mint(msg.sender, tokenId);
    }
}

  


























