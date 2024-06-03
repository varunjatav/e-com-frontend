import React, { useContext, useEffect, useState } from "react";
import Styles from "./ProductList.module.css";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormLabel,
  FormControl,
  Button,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
const ProductList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateNameRef = React.useRef("");
  const updatePriceRef = React.useRef("");
  const updateCategoryRef = React.useRef("");
  const updateQuantityRef = React.useRef("");
  const updateDescriptionRef = React.useRef("");
  const [productList, setProductList] = useState([]);
  const [status, setStatus] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct ] = useState(null);
  // console.log("SelectedProduct", selectedProduct);
  useEffect(() => {
    const getProductList = async () => {
      try {
        const res = await fetch(`http://localhost:8000/products`);
        const data = await res.json();
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductList();
  }, [status]);

  const searchData = async () => {
    let resp;
    if (query === "") {
      resp = await fetch(`http://localhost:8000/products`);
    } else {
      resp = await fetch(
        `http://localhost:8000/products/q/cat?category=${query}`
      );
    }

    let apiData = await resp.json();
    setProductList(apiData);
    setQuery("");
  };

  const bufferToBase64 = (buffer) => {
    const binary = buffer.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return window.btoa(binary);
  };

  // remove product function
  const removeProduct = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/products/delete/${productId}`,
        {
          method: "DELETE",
        }
      );
      setStatus(!status);
    } catch (error) {
      console.log("error :", error);
    }
  };

  // handle open modal
  const handleOpenModal = async (productId) => {
    setSelectedProduct(productId);
    onOpen();
  }

  // update product
  const updateProduct = async() => {
    const updatedProduct = {
      name: updateNameRef.current.value,
      price: updatePriceRef.current.value,
      category: updateCategoryRef.current.value,
      quantity: updateQuantityRef.current.value,
      description: updateDescriptionRef.current.value,
    };
    try {
      const res = await fetch(`http://localhost:8000/products/update/${selectedProduct}`,{
        method:"PATCH",
        headers:{
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedProduct)
      });
      if(res.status !== 200){
        console.log("error :", res.status);
        return;
      }
      setStatus(!status);
    } catch (error) {
      
    }
  };

  // console.log("data from product list: ",productList);
  return (
    <div className={Styles.mainContainer}>
      <h1>Product List</h1>
      <div className={Styles.searchDiv}>
        <input
          type="text"
          placeholder="Search Products"
          className={Styles.searchInput}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={Styles.searchButton} onClick={searchData}>
          <IoSearch />
        </button>
      </div>
      <table className={Styles.table}>
        <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Quantity</th>
          <th>Product Category</th>
          <th>Update</th>
          <th>Remove</th>
        </tr>
        {productList.map((product, i) => {
          return (
            <tr key={i}>
              <td>
                {product.image && product.image.data ? (
                  <img
                    src={`data:${
                      product.image.contentType
                    };base64,${bufferToBase64(product.image.data.data)}`}
                    alt={product.name}
                    width={"100px"}
                  />
                ) : (
                  <img src={product.image} alt={product.name} width={"100px"} />
                )}
              </td>
              <td>{product.name}</td>
              <td>&#8377; {product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() =>handleOpenModal(product._id)}>
                  <GrUpdate />
                </button>
              </td>
              <td>
                <button onClick={() => removeProduct(product._id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      <Modal
       
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={updateNameRef} placeholder="Name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input ref={updatePriceRef} placeholder="Price" type="number" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select name="category" id="category" placeholder="Select Category" ref={updateCategoryRef}>
                <option value="" default>
                  Select Category
                </option>
                <option value="rings">Rings</option>
                <option value="earrings">Earrings</option>
                <option value="mangalsutra">Mangalsutra</option>
                <option value="braceletes">Bracelets</option>
                <option value="solitiares">Solitiaries</option>
                <option value="kids">Kids</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input placeholder="Quantity" type="number" ref={updateQuantityRef}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description" ref={updateDescriptionRef} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => updateProduct()} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductList;
