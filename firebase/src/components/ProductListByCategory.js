import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {addProduct} from '../redux-store/actions'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
// Styled components for styling
const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: auto;
  overflow-X:scroll;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProductList = styled.div`
 
  display: flex;
  flex-direction: row;
  gap: 15px;
`;







function ProductListByCategory() {

 const navigate=useNavigate()
  const dispatch=useDispatch();

  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;

      try {
        const q = query(collection(db, 'products'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [category]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <div>
      <Navbar/>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:'30px'}}>
      <Title>Products by Category</Title>
      <ButtonGroup>
        <CategoryButton onClick={() => handleCategoryChange('biryani')}>Biryani</CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange('desserts')}>Desserts</CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange('burgers')}>Burgers</CategoryButton>
      </ButtonGroup>
      </div>
    <Container>
      
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ProductList>
        {products.map(product => (
          <div key={product.id} style={{display:'flex',flexDirection:'column',height:'500px',width:'400px',marginRight:'10px',alignItems:'center'}}>
            <div>{product.itemName}</div>
            <div>{product.hotelName}</div>
            {product.img && <img src={product.img} alt={product.itemName} width='300px' height='400px' />}
            <div style={{display:'flex',flexDirection:'row',width:'250px',justifyContent:'space-around'}}>
            <div>{'$'+product.itemPrice}</div>
            <div>{'ratings ->'+ product.rating}</div>
            </div>
            <button  onClick={()=>{dispatch(addProduct(product.id+new Date().getTime(),product.itemName,product.itemPrice,product.img))&&navigate("/cart") }} style={{backgroundColor:'green',color:'white',padding:'13px',borderRadius:'25px',border:'2px solid blue'}}>Add To Cart</button>

            
          </div>
        ))}
      </ProductList>
    </Container>
    </div>
  );
}

export default ProductListByCategory;







/*<ProductItem key={product.id}>
            <ProductName>{product.itemName}</ProductName>
            <ProductDetails>Hotel Name: {product.hotelName}</ProductDetails>
            <ProductDetails>Price: ${product.itemPrice}</ProductDetails>
            <ProductDetails>Rating: {product.rating}</ProductDetails>
            {product.img && <ProductImage src={product.img} alt={product.itemName} />}
            <button  onClick={()=>{dispatch(addProduct(product.id+new Date().getTime(),product.itemName,product.itemPrice,product.img))&&navigate("/cart") }} style={{backgroundColor:'green',color:'white',padding:'13px',borderRadius:'25px',border:'2px solid blue'}}>Add To Cart</button>
          </ProductItem>*/