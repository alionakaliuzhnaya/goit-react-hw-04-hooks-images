
import React, { useState,useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from "./services/pixabayApi"
import Button from './Button/Button';
import Loader from "./Loader/Loader"
import Modal from "./Modal/Modal"
import { Container,Notification } from './App.styled';


export default function App(){
  const [searchInfo,setSearchInfo]=useState("");
const [images,setImages]=useState([]);
const [status, setStatus] = useState("idle");
const [page,setPage]=useState(1);
const [largeImage,setLargeImage]=useState("")

useEffect(() => {
  if (!searchInfo) 
  {
    return ;

  }
  setStatus("pending");


  fetchImages(searchInfo, page).then(images => {
    if (images.totalHits !== 0) {
      setImages((prevState) => [...prevState, ...images.hits]);
        setStatus('resolved');
        return ;
      }
  
    return setStatus('rejected' );
  });},[searchInfo,page]);

  const handleFormSubmit = name => {
    setSearchInfo(name);
    setPage(1);
    setImages([]);
  };


  
  const onLoadMore= ()=>{
    setPage(prevState=>(prevState +1));
  

  window.scrollTo({
    top:document.documentElement.scrollHeight,
    behavior:"smooth",
  });};

  const onCloseModal= ()=>{
    setLargeImage("")

  }
  const onImageOpen =largeImage=>{
    setLargeImage(largeImage)
  }
  
   
    return (
      <Container>
        <Searchbar  onSubmit={handleFormSubmit} />
        {status==="idle" && <Notification>Enter image to search</Notification>}
        {status==="pending" && <Loader/>}

        {status === 'pending' && page > 1 && (
        <>
         <ImageGallery images={images} onModalShow={onImageOpen} />
         <Loader/>
        </>)}
        
         {status==="resolved" &&(
           <>
           <ImageGallery images={images}  onModalShow={onImageOpen}/>
           <Button onLoadMore={onLoadMore}/>
           </>
         )}

{status==="rejected" && 
<Notification>Sorry, there are no images matching your search query. Please try again.</Notification>}

  {largeImage && <Modal image={largeImage} onClose={onCloseModal}></Modal>}
      
       
      </Container>
    );
  }

 




