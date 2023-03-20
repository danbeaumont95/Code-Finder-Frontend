/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Main.css';
import {
  connect, useDispatch, useSelector,
} from 'react-redux';
import swal from 'sweetalert';
import { UserToSignUp } from './interfaces';
import { register, login } from '../redux/User/UserActions';
import { clearMessage } from '../redux/User/MessageActions';
import Helpers from '../helpers/helper';
import 'react-tooltip/dist/react-tooltip.css';
import Lookups from '../Lookups/lookups';
import CustomToolip from './CustomTooltip';
import { AppDispatch } from '../redux/store';

const mapStateToProps = (state: any) => ({
  current: state.user.currentUser,
  message: state.message.message,
});

const mapDispatchToProps = (dispatch: any) => ({
  register: (user: any) => dispatch(register(user)),
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// TO-DO sometimes message is string, sometimes object, need to differentiate
const { replaceString } = Helpers;
const { placeholderLookup } = Lookups;

function Main() {
  const form: any = useRef();
  const dispatch: AppDispatch = useDispatch();
  const { message } = useSelector((state: any) => state.message);

  const [user, setUser] = useState<UserToSignUp>({
    first_name: '', last_name: '', email: '', password: '',
  });
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showEmailHover, setShowEmailHover] = useState(false);
  const [showFirstNameHover, setShowFirstNameHover] = useState(false);
  const [showLastNameHover, setShowLastNameHover] = useState(false);
  const [showPasswordHover, setShowPasswordHover] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isError, setIsError] = useState(false);
  const [type, setType] = useState('signup');

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      window.location.href = '/home';
    }
  }, []);

  const handleChange = (e: any) => {
    const { target: { value, placeholder } } = e;
    dispatch(clearMessage(placeholder));
    e.preventDefault();

    setUser((prevState) => ({
      ...prevState,
      [placeholderLookup[placeholder]]: value,
    }));
  };

  const handleRepeartPasswordCheck = (e: any) => {
    e.preventDefault();
    const { target: { value } } = e;
    setRepeatPassword(value);
  };

  const handleMouseOver = (e: any) => {
    const { target: { placeholder } } = e;

    if (message && message.hasOwnProperty(placeholderLookup[placeholder])) {
      if (placeholder === 'Email') {
        setShowEmailHover(true);
      } else if (placeholder === 'First Name') {
        setShowFirstNameHover(true);
      } else if (placeholder === 'Last Name') {
        setShowLastNameHover(true);
      } else if (placeholder === 'Password') {
        setShowPasswordHover(true);
      }
    }
    if (!passwordsMatch && placeholder === 'Password') {
      setShowPasswordHover(true);
    }
  };

  const handleMouseLeave = (e: any) => {
    const { target: { placeholder } } = e;

    if (placeholder === 'Email') {
      setShowEmailHover(false);
    } else if (placeholder === 'First Name') {
      setShowFirstNameHover(false);
    } else if (placeholder === 'Last Name') {
      setShowLastNameHover(false);
    } else if (placeholder === 'Password') {
      setShowPasswordHover(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(user))
      .then((res: any) => {
        const newMessage = res.message;

        if (newMessage.message === 'Success') {
          localStorage.setItem('accessToken', newMessage.access);
          localStorage.setItem('refreshToken', newMessage.refresh);
          localStorage.setItem('userId', newMessage.id);
          swal('Success', 'You are now logged in! You will be redirected to the homepage', 'success').then(() => {
            window.location.href = '/home';
          });
        } else {
          swal('Error', newMessage.Error, 'error');
        }
      });
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === 'signup') {
      if (user.password !== repeatPassword) {
        swal('Error', 'Passwords do not match', 'error');
        setPasswordsMatch(false);
        setIsError(true);
        return;
      }

      setPasswordsMatch(true);
      setIsError(false);

      dispatch(register(user))
        .then((res: any) => {
          const newMessage = res.message;

          if (newMessage === 'Success') {
            setIsError(false);
            swal('Success', 'User created! You will now be redirected to login', 'success').then(() => {
              // window.location.href = "/login";
              setType('login');
            });
          } else {
            setIsError(true);
            if (Object.keys(newMessage).length === 1) {
              const errorMessage = newMessage[Object.keys(newMessage)[0]];
              swal('Error', errorMessage.join(' '), 'error');
            } else {
              const messageKeys = Object.keys(newMessage);
              const errors = messageKeys.map((el) => {
                const messageToReplace = newMessage[el][0];
                const replaced = replaceString(messageToReplace, el);
                return replaced;
              }).flat().join(' ');
              swal('Error', errors, 'error');
            }
          }
        })
        .catch(() => {
          swal('Error', 'Unable to create user at this time', 'error');
        });
    } else {
      // TO-DO login here
    }
  };

  return (
    <div className="main" style={{ height: '100vh', width: '100vw' }}>
      <div className="main_container">
        <h1 style={{ textDecoration: 'underline', textDecorationColor: '#0E6EAF', paddingBottom: '20px' }}>{type === 'login' ? 'Login' : 'Sign up'}</h1>
        <div className="main_container_form">
          {type === 'login' ? (

            <form onSubmit={handleLoginSubmit} ref={form}>
              <input id="email_input" type="text" className="login_signup_input" placeholder="Email" onChange={handleChange} style={message && message.hasOwnProperty('email') ? { border: '2px solid red' } : undefined} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
              <input id="password_input" type="password" className="login_signup_input" placeholder="Password" onChange={handleChange} style={(message && message.hasOwnProperty('password') && user.password.length) || !passwordsMatch ? { border: '2px solid red' } : undefined} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
              <div className="switch_type_section">
                <h3 style={{ paddingTop: '20px' }}>
                  Don't have an account?
                  <button type="button" className="login_here_button" onClick={() => setType('signup')}>Sign up here</button>
                </h3>

                <button type="submit" className="form_button">Login!</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} ref={form}>

              <CustomToolip content={showFirstNameHover && message.hasOwnProperty(placeholderLookup['First Name']) ? replaceString(message.email[0], 'first_name') : ''} isError={isError}>
                <input id="first_name_input" type="text" className="login_signup_input" placeholder="First Name" onChange={handleChange} style={message && message.hasOwnProperty('first_name') ? { border: '2px solid red' } : undefined} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
              </CustomToolip>

              <CustomToolip content={showLastNameHover && message.hasOwnProperty(placeholderLookup['Last Name']) ? replaceString(message.last_name[0], 'last_name') : ''} isError={isError}>
                <input id="last_input" type="text" className="login_signup_input" placeholder="Last Name" onChange={handleChange} style={message && message.hasOwnProperty('last_name') ? { border: '2px solid red' } : undefined} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
              </CustomToolip>

              <CustomToolip content={showEmailHover && message.hasOwnProperty(placeholderLookup.Email) ? typeof (message.email) === 'string' ? message.email : replaceString(message.email[0], 'email') : undefined} isError={isError}>
                <input id="email_input" type="text" className="login_signup_input" placeholder="Email" onChange={handleChange} style={message && message.hasOwnProperty('email') ? { border: '2px solid red' } : undefined} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
              </CustomToolip>

              <CustomToolip content={showPasswordHover && (message.hasOwnProperty(placeholderLookup.Password) || !passwordsMatch) ? !passwordsMatch ? 'Passwords do not match' : replaceString(message.password[0], 'password') : ''} isError={isError}>
                <input id="password_input" type="password" className="login_signup_input" placeholder="Password" onChange={handleChange} style={(message && message.hasOwnProperty('password') && user.password.length) || !passwordsMatch ? { border: '2px solid red' } : undefined} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
              </CustomToolip>

              <input type="password" className="login_signup_input" placeholder="Repeat Password" onChange={handleRepeartPasswordCheck} style={!passwordsMatch ? { border: '2px solid red' } : undefined} />

              <div className="switch_type_section">
                <h3 style={{ paddingTop: '20px' }}>
                  Already have an account?
                  <button type="button" className="login_here_button" onClick={() => setType('login')}>Login here</button>
                </h3>
                <button type="submit" className="form_button">Sign up!</button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}

export default connector(Main);
