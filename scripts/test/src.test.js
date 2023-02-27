const { ethers } = require("hardhat");
const { expect } = require("chai");
const signers = require("../modules/signers.js");
const deployer = require("../modules/deployer.js");
const base64 = require("../modules/base64.js");
const time = require("../modules/time.js");

describe("HelloWorld contract tests", function () {
	it("Passed message check", async function () {
		const addrs = await signers(10);
		const Token = await deployer("HelloWorld", addrs[0], false);

		expect(await Token["message()"]()).to.equal("Hello, world!");
		expect(await Token["message(address)"](Token.address)).to.equal(
			"Hello, world!"
		);
	});
});

describe("NFT contract tests", function () {
	it("Passed mint check", async function () {
		const addrs = await signers(4);
		const Token = await deployer("NFT", addrs[0], false);

		expect(await Token.ownerOf(1)).to.equal(ethers.constants.AddressZero);
		await expect(Token.connect(addrs[1]).mint(1)).to.emit(Token, "Transfer");
		expect(await Token.ownerOf(1)).to.equal(addrs[1].address);
		expect(await Token.ownerOf(2)).to.equal(ethers.constants.AddressZero);
		await expect(Token.connect(addrs[2]).mint(5)).to.emit(Token, "Transfer");
		expect(await Token.ownerOf(2)).to.equal(addrs[2].address);
		expect(await Token.ownerOf(3)).to.equal(addrs[2].address);
		expect(await Token.ownerOf(4)).to.equal(addrs[2].address);
		expect(await Token.ownerOf(5)).to.equal(addrs[2].address);
		expect(await Token.ownerOf(6)).to.equal(addrs[2].address);
		await expect(Token.connect(addrs[3]).mint(11)).to.revertedWithCustomError(
			Token,
			"QuantityLimit"
		);
	});

	it("Passed airdrop check", async function () {
		const addrs = await signers(2);
		const Token = await deployer("NFT", addrs[0], false);

		expect(await Token.balanceOf(addrs[1].address)).to.equal(0);
		await expect(Token.airdrop(addrs[1].address, 10)).to.emit(
			Token,
			"Transfer"
		);
		expect(await Token.balanceOf(addrs[1].address)).to.equal(10);
		await expect(
			Token.airdrop(addrs[1].address, 101)
		).to.revertedWithCustomError(Token, "QuantityLimit");
	});
});

describe("Token contract tests", function () {
	it("Passed mint check", async function () {
		const addrs = await signers(4);
		const Token = await deployer("Token", addrs[0], false);

		expect(await Token.balanceOf(addrs[1].address)).to.equal(0);
		await expect(Token.connect(addrs[1]).mint(1000)).to.emit(Token, "Transfer");
		expect(await Token.balanceOf(addrs[1].address)).to.equal(1000);
		expect(await Token.balanceOf(addrs[2].address)).to.equal(0);
		await expect(Token.connect(addrs[2]).mint(1000)).to.emit(Token, "Transfer");
		expect(await Token.balanceOf(addrs[2].address)).to.equal(1000);
		await expect(
			Token.connect(addrs[3]).mint(10001)
		).to.revertedWithCustomError(Token, "QuantityLimit");
	});

	it("Passed airdrop check", async function () {
		const addrs = await signers(2);
		const Token = await deployer("Token", addrs[0], false);

		expect(await Token.balanceOf(addrs[1].address)).to.equal(0);
		await expect(Token.airdrop(addrs[1].address, 1000)).to.emit(
			Token,
			"Transfer"
		);
		expect(await Token.balanceOf(addrs[1].address)).to.equal(1000);
		await expect(
			Token.airdrop(addrs[1].address, 100001)
		).to.revertedWithCustomError(Token, "QuantityLimit");
	});
});
