var SquareVerifier = artifacts.require("SquareVerifier");

contract('TestSquareVerfier', async () => {
    let contract;
    let proof;
    let inputs;

    beforeEach(async () => {
        contract = await SquareVerifier.new();
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

    it('Test verification with correct proof', async () => {
        const result = await contract.verifyTx(proof, inputs);
        assert.equal(result, true);
    });

    it('Test verification with incorrect proof', async () => {
        const result = await contract.verifyTx(proof, [1, 9]);
        assert.equal(result, false);
    });
});
