require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const GOERLI_API = process.env.MAINNET_API;
const MAINNET_API = process.env.MAINNET_API;
const GOERLI_PRIVATE_KEY = process.env.PRIVATE_KEY;
const MAINNET_PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {},
		goerli: {
			url: "",
			accounts: []
		},
		mainnet: {
			url: "",
			accounts: []
		}
	},
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},
	paths: {
		sources: "./src",
		scripts: "./scripts",
		tests: "./scripts/test",
		cache: "./build/cache",
		artifacts: "./build/artifacts"
	},
	gasReporter: {
		enabled: true,
		currency: "USD"
	}
};
