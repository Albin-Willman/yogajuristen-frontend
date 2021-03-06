import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { SignUp } from './SignUp';
import { MembersPage } from './MembersPage'
import mountains from '../images/mountains.jpg';


const Cards = styled.section`
  display: flex; 
  align-items: center; 
  flex-direction: column;
  color: #5e5e5e; 
  font-family: 'Barlow', sans-serif;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${mountains});
  background-size: cover;
`

const LogInCard = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
  background-color: rgba(256,256,256,0.8);
  border-radius: 16px;
  width: 70%;
  padding: 40px; 
  margin: 40px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    @media(min-width: 668px){
      flex-direction: column; 
      width: 70%;   
    } 
    @media(min-width: 1024px){
      width: 60%;
      flex-direction: column; 
    }
`

const SignUpCard = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: space-between;
  background-color: rgba(0,0,0,0.4);
  width: 70%;
  border-radius: 16px;
  padding: 40px; 
  margin: 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    @media(min-width: 668px)and(max-width: 1024px){
      flex-direction: row;    
    }    
`

const Text = styled.p`
  font-size: 1.4rem;
  color: white; 
    @media(min-width: 668px) {
      font-size: 1.8rem;
    }
`

const Input = styled.input`
  padding: 0.5em;
  height: 3rem; 
  font-size: 1rem; 
  color:  darkblue;
  background: #ebedf9;
  border: none;
  border-radius: 10px;
  margin: 16px; 
    @media(min-width: 668px) {
      font-size: 1.2rem;
    }
`

const Button = styled.button`
  padding: 0.5em;
  height: 3rem;
  font-size: 1rem; 
  color:  grey; 
  background: #ebedf9;
  border: lightgrey;
  border-radius: 10px;
  margin: 16px;
  &:hover {
    background: #b4bb72;
    color: white; 
  }
    @media(min-width: 668px) {
      font-size: 1.2rem;
    }
`

const Error = styled.h4`
color: black;
`

export const LogIn = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(name, password));
  };

  if (!accessToken) {
    return (
      <section>
        <Cards>
          <LogInCard>
            <form onSubmit={handleLogin}>
              <label>
                <Input
                  placeholder="Logga in med ditt namn"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
              <label>
                <Input
                  placeholder="Lösenord"
                  type='password'
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <Button type='submit'>Logga in</Button>
            </form>
            {errorMessage && <Error>{`${errorMessage}`}</Error>}
          </LogInCard>
          <SignUpCard>
            <Text>Bli medlem på Yogajuristen!<br></br>
              Som medlem får du bland annat tillgång till separata filmklipp av
              yogasekvenser, meditation, andning, motivation osv. Som
              medlem kommer du även få del av olika erbjudanden från tid till
              tid.
            </Text>
            <SignUp />
          </SignUpCard>
        </Cards>
      </section>
    );
  } else {
    return (
      <div>
        <MembersPage />
      </div>
    );
  }
};
