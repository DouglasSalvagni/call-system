import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

import logo from '../../assets/logo.png';

function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    
    if(name !== '' && email !== '' && password !== '') {
      signUp(email, password, name)
    }

  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="System Logo"/>
        </div>

        <form onSubmit={ handleSubmit }>
          <h1>Create an Account</h1>
          <input type="text" placeholder="Your name" value={name} onChange={ e => setName(e.target.value)}/>
          <input type="text" placeholder="email@email.com" value={email} onChange={ e => setEmail(e.target.value)}/>
          <input type="password" placeholder="********" value={password} onChange={ e => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? 'carregando' : 'Acessar'}</button>
        </form>

        <Link to="/">You already have an account?</Link>
      </div>
    </div>
    );
  }
  
  export default SignUp;