import React from 'react';
import './App.css';
import { connect, ConnectedProps } from "react-redux";
import Main from './Components/Main';
import Dashboard from './Components/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';

type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {
  current: string;
}
function nthIndex(str: string, pat: string, n: number){
  var L= str.length, i= -1;
  while(n-- && i++<L){
      i= str.indexOf(pat, i);
      if (i < 0) break;
  }
  return i;
}

const currentURL = window.location.href
const letterAfter = currentURL.substring(nthIndex(currentURL, '/', 4) +1)
function App(props: Props) {
  return (
    <div className="App">
      <Router>
        {localStorage.getItem('accessToken') ? (
            letterAfter !== '' ? (
            <NavBar />
          ) : null
        ) : null}
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>

    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    current: state.user.currentUser
  };
};

const connector = connect(
  mapStateToProps,
)

export default connector(App);
