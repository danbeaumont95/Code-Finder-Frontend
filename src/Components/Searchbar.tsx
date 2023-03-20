import React from 'react';
import Select from 'react-select';

function Searchbar(props: any) {
  const {
    options, colourStyles, handleCodeLanguageChange, handleMouseOver, handleFocus, handleMenuClose,
  } = props;

  return (
    <Select
      options={options}
      styles={colourStyles}
      onChange={handleCodeLanguageChange}
      onMenuOpen={handleMouseOver}
      onFocus={handleFocus}
      onMenuClose={handleMenuClose}
    />
  );
}
export default Searchbar;
