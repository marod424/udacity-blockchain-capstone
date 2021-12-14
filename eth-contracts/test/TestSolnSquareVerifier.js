var SquareVerifier = artifacts.require("SquareVerifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

contract('TestSolnSquareVerfier', async (accounts) => {
    let contract;
    let proof;
    let inputs;

    const owner = accounts[0];
    const tokenName = "0x Land Title";
    const tokenSymbol = "ZLT";

    beforeEach(async () => {
        const verifier = await SquareVerifier.new();
        contract = await SolnSquareVerifier.new(verifier.address, tokenName, tokenSymbol);
        proof = {
            "a": [
                "0x14145df7007a1a3ee00c6daaaa9e18d4ebed6c18f8ffaadd754d7eda8ccdfbd2",
                "0x2d8e2270434365c7d8082b8204c4cdcc3b61e4b0b8b1632a637667345eb074f8"
            ],
            "b": [
                [
                    "0x2dd88f58f97db829eeb2b17608923ce7234f4b1e1991385a37f8ce5187b2584a",
                    "0x227c26d2ba8bb7572f3f9a19bde51335df9efe85a9109716d109f0929e888e63"
                ],
                [
                    "0x03ccb3c04728100656892390fbedfb374d2cd262a75a301e7f535976bad22f5f",
                    "0x299945856efafbab223ee4dc18b5bc90cd72e8c3099b1c9bd948f82cb52a4d27"
                ]
            ],
            "c": [
                "0x106a33a283d50ebf6ffdf81245b6f9c76d06d64eb6bbe915a12ca64dda5555ef",
                "0x118cc246f7f186e58ff439d0246d1c5607c4614723fe1f07356edc2676037d5b"
            ]
        };
        inputs = [
            "0x0000000000000000000000000000000000000000000000000000000000000009",
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        ];
    });

    it('Test if a new solution can be added', async () => {
        let eventEmitted = false;
        contract.SolutionAdded(null, () => eventEmitted = true);

        await contract.addSolution({_index: 1, _address: owner});

        assert.equal(eventEmitted, true);      
    });

    it('Test if an ERC721 token can be minted', async () => {
        const tokenId = 1;

        await contract.mintNFT(tokenId, proof.a, proof.b, proof.c, inputs);

        const name = await contract.name();
        const symbol = await contract.symbol();
        const ownerOf = await contract.ownerOf(tokenId);

        assert.equal(name, tokenName);
        assert.equal(symbol, tokenSymbol);
        assert.equal(ownerOf, owner);
    });
});
