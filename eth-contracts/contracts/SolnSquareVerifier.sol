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
    IVerifier private _verifier;

    struct Solution {
        uint256 _index;
        address _address;
    }

    Solution[] private _solutions;

    mapping(uint256 => Solution) private _uniqueSolutions;

    event SolutionAdded(uint256 indexed _index, address indexed _address);

    constructor(address verifierAddress, string memory name, string memory symbol) 
        CustomERC721Token(name, symbol) 
    {
        _verifier = IVerifier(verifierAddress);
    }

    function addSolution(Solution memory solution) public {
        uint256 index = solution._index;

        _solutions.push(solution);
        _uniqueSolutions[index] = solution;

        emit SolutionAdded(index, solution._address);
    }

    function mintNFT(
        uint256 tokenId,
        uint[2] memory a, 
        uint[2][2] memory b, 
        uint[2] memory c, 
        uint[2] memory input
    ) external {
        require(_uniqueSolutions[tokenId]._address == address(0), "Solution already exists");
        require(_verifier.verifyTx(a, b, c, input), "Verification failed");

        Solution memory sol = Solution({
            _index: tokenId, 
            _address: msg.sender
        });

        addSolution(sol);
        mint(msg.sender, tokenId);
    }
}

  


























