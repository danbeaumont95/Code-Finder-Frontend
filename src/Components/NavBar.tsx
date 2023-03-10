import React, { useEffect, useState } from 'react';
import '../Styles/NavBar.css';
import { FaSearch } from 'react-icons/fa';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setSearchTextAction, setSelectOption } from '../redux/User/SearchActions';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const NavBar = () => {
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState('')
  const [showSelect, setShowSelect] = useState(false)
  const [showSelectFocused, setShowSelectFocused] = useState(false)

  const dispatch: AppDispatch = useDispatch();
  
  // Use effect below auto sets redux state
  useEffect(() => {
    console.log({language, searchText})
    dispatch(setSearchTextAction(searchText))
    dispatch(setSelectOption(language))
  }, [dispatch, searchText, language])

  const handleSearchClick = (e: any) => {
    e.preventDefault();
    // dispatch(setSearchTextAction(searchText))
  }
  
  const handleSearchTextChange = (e: any) => {
    const { target: { value } } = e;
    e.preventDefault();
    setSearchText(value)
  }
  const options = [
    { value: '', label: '' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' }
  ]

  const colourStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'white', width: '200px', color: 'red' }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        width: '200px',
        cursor: 'pointer',
        color: '#0E6EAF !important'
      };
    },
    menu: (styles: any) => ({...styles, width: '200px', color: 'blue'})
  };

  const handleCodeLanguageChange = (e: any) => {
    setLanguage(e.value)
  }

  const handleMouseOver = () => {
    setShowSelect(true)
  }
  const handleMouseLeave = () => {
    setShowSelect(false)
  }

  const handleFocus = () => {
    console.log('handle focus')
    setShowSelectFocused(true)
  }
  const handleMenuClose = () => {
    console.log('handleMenuClose')
    setShowSelectFocused(false)
  }

  return (
    <div className='navbar'>
      <nav className='navbar_nav'>

        <ul className='navbar_menu'>

          <div className='navbar_div'>
            <h1 className='navbar_item'><Link to='/home'>Code Finder</Link></h1>
          </div>

          <div className='navbar_div'>
            <div className="box" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
              <form name="search">
                <input type="text" className="input" name="txt" 
                  onChange={handleSearchTextChange}
                  />
              </form>
              {showSelect || showSelectFocused ? (
                <div className='navbar_select_dropdown'>

                  <Select options={options} styles={colourStyles} onChange={handleCodeLanguageChange} onMenuOpen={handleMouseOver} onFocus={handleFocus} onMenuClose={handleMenuClose}/>
                </div>

              ) : null}
              <i onClick={handleSearchClick}><FaSearch /></i>

            </div>
          </div>

          <div className='navbar_div'>
            <li className='navbar_item'><Link to='/dashboard'>Dashboard</Link></li>
            <li className='navbar_item'><Link to='/home'>Home</Link></li>
          </div>

        </ul>
      </nav>
    </div>
  )
}

export default NavBar;
