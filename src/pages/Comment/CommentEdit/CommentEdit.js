import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuEditForm = ({ id }) => {
  const [data, setData] = useState({
    commentText: '',
    score: 0,
    itemId: parseInt(id),
    commentDate: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleEditer = async (event) => {
    event.preventDefault();
    const username = localStorage.getItem('username');
  
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
  
    if (data.commentText) {
      setError('');
      try {
        const response = await axios.post(`http://localhost:8080/api/commentAdd/${username}`, { ...data, commentDate: formattedDate });
  
        if (response.status === 200) {
          console.log("Yorum Başarılı Bir şekilde Kaydedildi");
          toast.success('Restoranınız başarıyla tanımlandı!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            
          })
          window.location.reload();



          
        } else {
          console.error("Yorum kaydı sırasında bir hata oluştu.");
        }
      } catch (error) {
        console.error("Yorum kaydı sırasında bir hata oluştu.", error);
      }
    } else {
      setError('Lütfen tüm alanları doldurun.');
    }
  };
  const handleStarClick = (value) => {
    setData({ ...data, score: value });
  };

  const StarRating = () => {
    const { score } = data;


    return (
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={() => handleStarClick(value)}
          >
            {value <= score ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };


  return (
    <Container>
      <FormCategory onSubmit={handleEditer}>
        <TextInfoC>
          <div>
            <p>
              <br />
              * Yorum yapmak istediğiniz ürün yukarıda görüntülenmektedir.
            </p>
          </div>
        </TextInfoC>
        <InputContainer>
          <InputLabel>Yorumunuz :</InputLabel>
          <Input
            type="text"
            name='commentText'
            placeholder="Yorumunuz"
            value={data.commentText}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Puanınız :</InputLabel>
          <StarRating />
        </InputContainer>
        <TextInfoC>
          <div>
            <p>
              <br />
              * Puanlamak zorunlu değildir.
            </p>
          </div>
        </TextInfoC>
        <Button type='submit'>{'Yorum Yap'}</Button>
      </FormCategory>
      {error && <Error>{error}</Error>}
      
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 50vh;
  padding-top: 50px;
  background-color: #cac6c6;
  max-width: 90%;
  margin: 0 auto; 
`;


const FormCategory = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin-top: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 1000px;
`;

const Input = styled.input` 
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 70%;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 4px;
  border: none;
  background-color: #c10e18;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 8px;
`;

const TextInfoC = styled.div`
  padding-bottom: 24px;
  border-radius: 4px;
  border: none;
  transition: background-color 0.3s ease;
`;

const InputLabel = styled.span`
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  width: 30%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: left;
  width: 100%;
`;

export default MenuEditForm;
