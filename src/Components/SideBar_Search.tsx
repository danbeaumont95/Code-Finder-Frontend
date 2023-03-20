import React, { useCallback, useState } from 'react';
import Select from 'react-select';
import Searchbar from './Searchbar';
import '../Styles/SideBar_Search.css';

const SideBarSearch = (props: any) => {
  const [text, setText] = useState('')
  const onSubmit = (event: any) => {
    // props.highlightWords(event)
    props.highlightWords(text)
  }
  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
},[])

  return (
    <div style={{width: '200px', height: '50px', display: 'flex', justifyContent: 'center'}}>
    <div className="wrap">
   <div className="search">
      <input type="text" className="searchTerm" placeholder="Search..." onChange={handleOnChange}/>
      <button type="submit" className="searchButton" onClick={onSubmit}>
        <i className="fa fa-search"></i>
     </button>
   </div>
</div>
    </div>
  )
};

export default SideBarSearch;
