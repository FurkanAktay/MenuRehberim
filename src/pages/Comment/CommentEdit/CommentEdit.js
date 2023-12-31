import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import "./CommentEdit.css";

const MenuEditForm = () => {
  const [user, setUser] = useState({
    name: '',
    surName: '',
    email: '',
    userName: '',
    password: '',
    restourantName: '',
    category: '',
    placeAdress:'',
    placeBgPicName: '',
    placeDefinition: '',
    restourantPassword: ''
  });
  const [error, setError] = useState(null);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleEditer = (event) => {
    event.preventDefault();
   
      // Kullanıcı kaydı
      if (user.name && user.surName && user.userName && user.email && user.password) {
        setError('');
        axios.post('http://localhost:8081/api/user', user)
          .then(response => {
            if (response.data === true) {
              console.error("Kullanıcı Kaydı Başarılı");
              // Başarılı kayıt durumunda başka bir sayfaya yönlendirme yapılabilir.
            } else {
              console.error("Kullanıcı kaydı sırasında bir hata oluştu.");
            }
          }).catch(error => {
            console.error("Kullanıcı kaydı sırasında bir hata oluştu.");
          });
      } else {
        setError('Lütfen tüm alanları doldurun.');
      }
  };


    const TextInfo = () => {
        return (
          <div >
            <div >
                <p >
                <br/>
                  * Yorum yapmak istediğiniz ürün yukarı da görüntülemektedir. 
                </p>
            </div>
          </div>
         )
        } 

    const TextInfoSecond = () => {
        return (
          <div >
            <div >
                <p >
                <br/>
                  * Puanlamak zorunlu değildir. 
                </p>
            </div>
          </div>
         )
        } 

        const StarRating = () => {
            const [rating, setRating] = useState(0);
          
            const handleStarClick = (value) => {
                if (value === rating) {
                  setRating(0);
                } else {
                  setRating(value);
                }
              };
          
            return (
              <div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    style={{ cursor: 'pointer', fontSize: '24px' }}
                    onClick={() => handleStarClick(value)}
                  >
                    {value <= rating ? '★' : '☆'}
                  </span>
                ))}
                
              </div>
            );
          }

  return (
    <Container>
      
      <FormCategory onSubmit={handleEditer}>
        { (
          <>
          <TextInfoC>
            <TextInfo/>  
          </TextInfoC>
            <InputContainer>
                <InputLabel>Yorumunuz :</InputLabel>
                <Input
                 type="text"
                 name='commentContent'
                 placeholder="Yorumunuz"
                value={user.name}
                onChange={handleInputChange}
                />
            </InputContainer>
            <InputContainer>
                <InputLabel>Puanınız :</InputLabel>
                <StarRating/>
                {/* <Input
                 type="score"
                 name='commentScore'
                 placeholder="Puanınız"
                value={user.name}
                onChange={handleInputChange}
                /> */}
            </InputContainer>
            
            <TextInfoC>
            <TextInfoSecond/>  
          </TextInfoC>
          </>
        )}
        <Button type='submit'>{ 'Yorum Yap'}</Button>
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
