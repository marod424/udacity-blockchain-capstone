var ERC721Mintable = artifacts.require("CustomERC721Token");

contract('TestERC721Mintable', async (accounts) => {
    let contract;

    const owner = accounts[0];
    const ape = accounts[1];

    describe('match erc721 spec', () => {

        beforeEach(async () => { 
            contract = await ERC721Mintable.new("0x Land Title", "ZLT");

            await contract.mint(owner, 1);
            await contract.mint(owner, 2);
            await contract.mint(owner, 3);
        });

        it('should return total supply', async () => { 
            const totalSupply = await contract.totalSupply();
            assert.equal(totalSupply, 3);
        });

        it('should get token balance', async () => { 
            const tokenBalance = await contract.balanceOf(owner);
            assert.equal(tokenBalance, 3);
        });

        it('should return token uri', async () => { 
            const tokenURI = await contract.tokenURI(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
        });

        it('should transfer token from one owner to another', async () => { 
            await contract.safeTransferFrom(owner, ape, 1);
            const newOwner = await contract.ownerOf(1);
            assert.equal(newOwner, ape);
        });
    });

    describe('have ownership properties', () => {
        beforeEach(async () => { 
            contract = await ERC721Mintable.new("0x Land Title", "ZLT");
        });

        it('should fail when minting when address is not contract owner', async () => { 
            let reason = '';
            
            try {
                await contract.mint(ape, 1, {from: ape});
            }
            catch(error) {
                reason = error.reason;
            }

            assert.equal(reason, 'Caller must be owner');
        });

        it('should return contract owner', async () => { 
            const contractOwner = await contract.owner();
            assert.equal(contractOwner, owner);
        });
    });
})