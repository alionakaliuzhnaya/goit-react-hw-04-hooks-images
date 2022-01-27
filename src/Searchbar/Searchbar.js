import React, { useState } from 'react';
import PropTypes from "prop-types";
import toast, { Toaster } from 'react-hot-toast';
import { FixedHeader, FormButton, Input, SearchForm,SearchAlt } from './Searchbar.styled';

export default function Searchbar({onSubmit}){
  const [searchInfo,setSearchInfo]=useState("");


  const handleNameChange =event=>{
    setSearchInfo( event.currentTarget.value.toLowerCase())
};

const handleSubmit=event=>{
  event.preventDefault();

  if (searchInfo.trim()===""){
    toast.error("Sorry, there are no images matching your search query. Please try again.")
    return;
  }
 onSubmit(searchInfo);
  setSearchInfo("");

}

        return (
            
            <FixedHeader >
  <SearchForm  onSubmit={handleSubmit}
 >
    <FormButton type="submit">
     <SearchAlt/>
    </FormButton>
    <Input
      type="text"
      autoComplete="off"
      placeholder="Search images and photos"
      value={searchInfo}
      onChange={handleNameChange}
    />
  </SearchForm>
  <Toaster />
</FixedHeader>
        )
    }


Searchbar.propTypes={
  onSubmit:PropTypes.func.isRequired
}