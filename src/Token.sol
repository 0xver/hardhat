// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity ^0.8.4;

import "@0xver/solver/supports/ERC165.sol";
import "@0xver/solver/auth/extensions/Operator.sol";
import "@0xver/solver/token/metadata/ERC20Metadata.sol";

contract Token is ERC165, Operator, ERC20Metadata {
	error QuantityLimit(
		uint256 quantity,
		uint256 txnLimit,
		uint256 totalSupplyLimit
	);

	uint256 userTxnLimit = 10000;
	uint256 authTxnLimit = 100000;
	uint256 totalSupplyLimit = 1000000;

	constructor() ERC20Metadata("Token", "TKN") Operator(msg.sender) {}

	function mint(uint256 _quantity) public {
		_eoaOnly();
		if (
			_quantity + totalSupply() > totalSupplyLimit ||
			_quantity > userTxnLimit
		) {
			revert QuantityLimit(_quantity, userTxnLimit, totalSupplyLimit);
		}
		_mint(msg.sender, _quantity);
	}

	function airdrop(address _to, uint256 _quantity) public operatorship {
		if (
			_quantity + totalSupply() > totalSupplyLimit ||
			_quantity > authTxnLimit
		) {
			revert QuantityLimit(_quantity, authTxnLimit, totalSupplyLimit);
		}
		_mint(_to, _quantity);
	}

	function supportsInterface(
		bytes4 interfaceId
	) public pure virtual override(ERC165) returns (bool) {
		return
			interfaceId == type(IERC173).interfaceId ||
			interfaceId == type(IERC20).interfaceId ||
			interfaceId == type(IERC20Metadata).interfaceId ||
			super.supportsInterface(interfaceId);
	}
}
