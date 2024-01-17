import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [isRestoranRegister, setIsRestoranRegister] = useState(false);
  const [user, setUser] = useState({
    name: '',
    surName: '',
    email: '',
    userName: '',
    password: '',
    restourantName: '',
    category: '',
    placeAdress: '',
    placeBgPicName: '',
    placeDefinition: '',
    restourantPassword: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const toggleRegisterType = () => {
    setIsRestoranRegister(!isRestoranRegister);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (!isRestoranRegister) {
      // User registration
      if (user.name && user.surName && user.userName && user.email && user.password) {
        setError('');
        axios.post('http://localhost:8080/api/user', user)
          .then(response => {
            if (response.status === 200) {
              console.log("Kullanıcı Kaydı Başarılı");
              // Show success toast
              toast.success('Kullanıcı Kaydı Başarılı!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                
              });
              navigate('/Login');

            } else {
              console.error("Kullanıcı kaydı sırasında bir hata oluştu.");
            }
          }).catch(error => {
            console.error("Kullanıcı kaydı sırasında bir hata oluştu.");
          });
      } else {
        setError('Lütfen tüm alanları doldurun.');
      }

    } else {
      // Restaurant registration
      if (user.name && user.surName && user.userName && user.email && user.password) {
        setError('');
        axios.post('http://localhost:8080/api/restourantAdd', user)
          .then(response => {
            if (response.status === 200) {
              console.error('Kayıt tamam');
              // Show success toast
              toast.success('Restoran Kaydı Başarılı! Giriş Sayfasına Yönlendiriliyorsunuz.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
              });

              navigate('/Login');
            } else {
              console.error("Restoran kaydı sırasında bir hata oluştu.");
            }
          }).catch(error => {
            console.error("Restoran kaydı sırasında bir hata oluştu.");
          });
      } else {
        setError('Lütfen tüm alanları doldurun.');
      }
    }
  };

  return (
    <Container>
      <Title>Kayıt Ol</Title>
      <RegisterOptionContainer>
        <RegisterOptionButton onClick={toggleRegisterType} selected={!isRestoranRegister}>
          Kullanıcı Kaydı
        </RegisterOptionButton>
        <RegisterOptionButton onClick={toggleRegisterType} selected={isRestoranRegister}>
          Restoran Kaydı
        </RegisterOptionButton>
      </RegisterOptionContainer>
      <Form onSubmit={handleRegister}>
        {isRestoranRegister ? (
          <>
            <Input
              type="text"
              name='name'
              placeholder="Ad"
              value={user.name}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name='surName'
              placeholder="SoyAd"
              value={user.surName}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name='userName'
              placeholder="KullanıcıAdı"
              value={user.userName}
              onChange={handleInputChange}
            />
            <Input
              type="email"
              name='email'
              placeholder="email"
              value={user.email}
              onChange={handleInputChange}
            />
            <Input
              name='password'
              type="password"
              placeholder="Şifre"
              value={user.password}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <Input
              type="text"
              name='name'
              placeholder="Ad"
              value={user.name}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name='surName'
              placeholder="Soyad"
              value={user.surName}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name='userName'
              placeholder="Kullanıcı Adı"
              value={user.userName}
              onChange={handleInputChange}
            />
            <Input
              name='email'
              type="email"
              placeholder="E-posta Adresi"
              value={user.email}
              onChange={handleInputChange}
            />
            <Input
              name='password'
              type="password"
              placeholder="Şifre"
              value={user.password}
              onChange={handleInputChange}
            />
          </>
        )}
        <Button type='submit'>{isRestoranRegister ? 'Restoran Kaydı Oluştur' : 'Kullanıcı Kaydı Oluştur'}</Button>
      </Form>
      {error && <Error>{error}</Error>}
      <ToastContainer />
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
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
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

const RegisterOptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const RegisterOptionButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => (props.selected ? '#007bff' : 'transparent')};
  color: ${(props) => (props.selected ? 'white' : '#007bff')};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin: 0 8px;

  &:hover {
    background-color: ${(props) => (props.selected ? '#0056b3' : '#f5f5f5')};
    color: ${(props) => (props.selected ? 'white' : '#0056b3')};
  }
`;

export default RegisterForm;
