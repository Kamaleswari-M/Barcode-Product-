// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract FakeProductDetection {

    struct Product {
        string name;
        bool registered;
        bool sold;
    }

    mapping(string => Product) private products;

    function addProduct(string memory _id, string memory _name) public {
        require(!products[_id].registered, "Product already exists");
        products[_id] = Product(_name, true, false);
    }

    function verifyProduct(string memory _id) public view returns (string memory) {
        if (!products[_id].registered)
            return "Fake Product";
        else if (products[_id].sold)
            return "Duplicate Product";
        else
            return "Genuine Product";
    }

    function markAsSold(string memory _id) public {
        require(products[_id].registered, "Product not found");
        products[_id].sold = true;
    }
    function getProduct(string memory _id) public view returns (string memory, bool) {
    if (products[_id].registered) {
        return (products[_id].name, true);
    }
    return ("", false);
}

}
