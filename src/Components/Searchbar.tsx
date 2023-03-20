import React from 'react';
import Select from 'react-select';

const Searchbar = (props: any) => (
  <Select options={props.options} styles={props.colourStyles} onChange={props.handleCodeLanguageChange} onMenuOpen={props.handleMouseOver} onFocus={props.handleFocus} onMenuClose={props.handleMenuClose}/>
)
export default Searchbar;
