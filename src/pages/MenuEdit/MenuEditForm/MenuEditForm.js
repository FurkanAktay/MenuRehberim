import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./MenuEditForm.css";

const MenuEditForm = ({username}) => {
  const [item, setItem] = useState({
    itemName: '',
    itemDefinition: '',
    itemPrice: '',
    itemCategory:''
  
  });
  const [itemPicName, setItemPicName] = useState(null);
  const [error, setError] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setItemPicName(file);
  };
 

  const handleEditer = async (event) => {
    event.preventDefault();

    if (itemPicName) {
      setError('');
      try {
        const formData = new FormData();
        Object.entries(item).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append('file', itemPicName);

        const response = await axios.post(
          `http://localhost:8080/api/menuItemsAdd/${username}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          console.error(response.data);
          toast.success('Ürün başarıyla kaydedildi!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // 3 saniye sonra otomatik olarak kapanır
            onClose: () => {
              // Sayfa yenileme işlemi
              window.location.reload();
            },
          });

          // Başka bir işlem yapılabilir
        } else {
          console.error('Dosya yüklenirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Dosya yüklenirken bir hata oluştu.', error);
      }
    } else {
      setError('Lütfen bir dosya seçin.');
    }
  };

  const FormHeader = () => {
    return (
      <div >
        <div >
            <h2 className="heading-secondary">
              Menu İçeriğinizi Kaydedin {username}! 
            </h2>
        </div>
      </div>
     )
    } 

    const TextInfo = () => {
        return (
          <div >
            <div >
                <p >
                <br/>
                  *Ürün kategorisi listeniz boş veya aradığınız kategori yok ise, lütfen aşağıdan ürün kategorisi ekleyiniz. 
                </p>
            </div>
          </div>
         )
        } 

  return (
    <Container>
      <FormHeaderC>
        <FormHeader/>  
      </FormHeaderC>

      <Form onSubmit={handleEditer}>
        { (
          <>
            <InputContainer>
                <InputLabel>Urun Ad :</InputLabel>
                <Input
                 type="text"
                 name='itemName'
                 placeholder="Urun Adı"
                value={item.itemName}
                onChange={handleInputChange}
                />
            </InputContainer>
            <InputContainer>
            <InputLabel>Urun Açıklama :</InputLabel>
            <Input
              type="text"
              name='itemDefinition'
              placeholder="Urun Açıklaması"
              value={item.itemDefinition}
              onChange={handleInputChange}
            />
             </InputContainer>

             <InputContainer>
              <InputLabel>Urun Fotoğrafı :</InputLabel>
              <Input
                type="file"
                accept=".jpg, .jpeg, .png" 
                name='itemPicName'

                onChange={handleFileChange}
              />
              </InputContainer>
            <InputContainer>
            <InputLabel>Urun Fiyatı :</InputLabel>
            <Input
              name='itemPrice'
              type="text"
              placeholder="Urun Fiyatı"
              value={item.itemPrice}
              onChange={handleInputChange}
            />
            </InputContainer>
             <InputContainer>
            <InputLabel>Urun Kategorisi :</InputLabel>
            <Input
              name='itemCategory'
              type="text"
              placeholder="Urun Kategorisi"
              value={item.itemCategory}
              onChange={handleInputChange}
            />
            </InputContainer>
             
          </>
        )}
        <Button type='submit'>{ 'Urun Kaydet'}</Button>
      
      </Form>
      {error && <Error>{error}</Error>}


     {/* <FormCategory onSubmit={handleEditer}>
        { (
          <>
          <TextInfoC>
            <TextInfo/>  
          </TextInfoC>
            <InputContainer>
                <InputLabel>Kategori Ad :</InputLabel>
                <Input
                 type="text"
                 name='kategoriAd'
                 placeholder="Kategori Adı"
                value={user.name}
                onChange={handleInputChange}
                />
            </InputContainer>
          </>
        )}
        <Button type='submit'>{ 'Kategori Kaydet'}</Button>
      </FormCategory> */}
      {error && <Error>{error}</Error>}
    
    </Container>
    
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 50px;
  padding-bottom: 100px;
  background-color: #cac6c6;
  max-width: 90%; 
  margin: 0 auto; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 1000px;
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

const FormHeaderC = styled.div`
padding: 12px 24px;
border-radius: 4px;
border: none;
background-color: #c10e18;
margin-bottom: 50px;
color: white;
cursor: pointer;
transition: background-color 0.3s ease;

`;

const TextInfoC = styled.div`
padding-bottom: 24px;
border-radius: 4px;
border: none;
cursor: pointer;
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
