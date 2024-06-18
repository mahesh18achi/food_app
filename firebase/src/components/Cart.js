

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeProduct } from '../redux-store/actions';  
// Styled components for styling
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CartItem = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
`;

const ProductName = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const ProductDetails = styled.p`
  margin: 5px 0;
`;

const ProductImage = styled.img`
  max-width: 100px;
  height: auto;
  margin-left: 10px;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const CartSummary = styled.div`
  margin-top: 20px;
  text-align: center;
`;

function Cart() {
  const dispatch = useDispatch();
  const { count, sum, products } = useSelector((state) => state.cart);
 console.log(count,sum,products)
 
  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <Container>
      <Title>Shopping Cart</Title>
      <CartList>
        {products.map((product) => (
          <CartItem key={product.id}>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductDetails>Price: ${product.cost}</ProductDetails>
            </ProductInfo>
            {product.img && <ProductImage src={product.img} alt={product.name} />}
            <RemoveButton onClick={() => handleRemove(product.id)}>Remove</RemoveButton>
          </CartItem>
        ))}
      </CartList>
      <CartSummary>
        <p>Total Items: {count}</p>
        <p>Total Price: ${sum}</p>
      </CartSummary>
    </Container>
  );
}

export default Cart;
