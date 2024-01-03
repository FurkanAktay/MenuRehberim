import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ 
    userName: '',
    password: '',
    isRestaurantLogin: false
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setUser({ ...user, [name]: name === 'isRestaurantLogin' ? checked : value });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!user.userName || !user.password) {
      setError('Kullanıcı adı ve şifre gereklidir.');
      return;
    }

    if (user.isRestaurantLogin) {
      // Restaurant giriş kontrolü ve API isteği
      axios.post('http://localhost:8080/api/rlogin', {
        userName: user.userName,
        password: user.password
      })
      .then(response => {
        console.log(response.data); // Geri dönen veriye göre işlem yapılabilir
        navigate('/PlaceEdit', { state: { username: user.userName } });
      })
      .catch(error => {
        setError('Restoran girişi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      });
    } else {
      // Kullanıcı giriş kontrolü ve API isteği
      axios.post('http://localhost:8080/api/login', {
        userName: user.userName,
        password: user.password
      })
      .then(response => {
        if (response.data === 'Giriş başarılı!') {
          localStorage.setItem('username', user.userName);

          console.log('Kullanıcı girişi başarılı!');
          navigate('/'); // Kullanıcı adını ana sayfaya taşıyarak yönlendir
        } else {
          setError('Kullanıcı adı veya şifre hatalı.');
        }
      })
      .catch(error => {
        setError('Kullanıcı girişi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title>Giriş Yap</Title>
        <Input
          type="text"
          name='userName'
          placeholder="Kullanıcı Adı / Restoran Adı"
          value={user.userName}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          placeholder="Şifre"
          name='password'
          value={user.password}
          onChange={handleInputChange}
        />
        <CheckboxLabel>
          Restoran Girişi
          <Checkbox
            type="checkbox"
            name='isRestaurantLogin'
            checked={user.isRestaurantLogin}
            onChange={handleInputChange}
          />
        </CheckboxLabel>
        <Button type="submit">Giriş Yap</Button>
        {error && <Error>{error}</Error>}
      </Form>
      <RegisterLink to="/register">Hesabınız yok mu? Şimdi kayıt olun.</RegisterLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
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
  width: 300px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #333;
`;

const Checkbox = styled.input`
  margin-left: 8px;
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

const RegisterLink = styled(Link)`
  margin-top: 16px;
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

export default LoginForm;