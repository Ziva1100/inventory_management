'use client'

import Image from "next/image";
import {useStates, useEffect, useState} from 'react'
import {firestore} from '@/firebase'
import {Box, Typography, Modal, Stack, TextField, Button} from '@mui/material'
import {collection ,query, getDocs, getDoc, setDoc, deleteDoc, doc, grid
} from 'firebase/firestore'
import { Special_Elite } from "next/font/google";


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open,setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchItem, setSearchItem] =useState('')
  const [searchResults, setSearchResult] = useState([])

  const updateInventory = async () => {
    const snapshot = query(collection(firestore,'inventory')) 
    const docs = await getDocs(snapshot)
    const inventoryList= []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
    })
    })
  setInventory(inventoryList)
  console.log(inventoryList)
}
  ;

  const removeItem = async(item) => {
    const docRef = doc(collection(firestore,'inventory'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const {quantity} =  docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, {quantity: quantity-1})
      }
    }
    await updateInventory()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore,'inventory'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity+1})

    }
    else{
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  // const searchInventory = async(item) =>{
  //   const docRef = doc(collection(firestore,'inventory'), item)
  //   const docSnap = await getDoc(docRef)

  //   if(docSnap.exists()){

    //     setSearchResult(docSnap.data())}
      
    
    // else{
    //   setSearchResult([])
    // }}


  

  useEffect(()=> {
    updateInventory()},[]
  )

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // const handleKeyPress = async(e) =>{
  //   if(e.key ==='Enter'){
  //     e.preventDefault()
  //     await searchInventory(itemName)
    // }
  

  return (
    <Box
    width='100vw'
    height='100vh'
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection={"column"}
    gap={2}
    // bgcolor='lightgrey' // Optional: Background color for visibility
  >
    <Modal
      open={open}
      onCLose={handleClose}>
        <Box
        sx={{position:"absolute",
          top:"50%",
          left:"50%",
          width:400,
          bgcolor:"white",
          border:"2px solid #000",
          boxShadow:24,
          p:4,
          display:"flex",
          flexDirection:"column",
          gap:3,
          transform:"translate(-50%,-50%)"}}
        
        >
          <Typography
          variant="h6"
          fontFamily="Segoe UI"  >
            Add Item
          </Typography>
          <Stack
          width="100%"
          // height={300}
          direction="row"
          spacing={2}>
            <TextField
            variant='outlined'
            fullWidth
            value={itemName}
            onChange={(e)=>{
              setItemName(e.target.value)
            }}/>
            <Button
            variant='outlined'
            onClick={()=>{
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            >Add</Button>
          </Stack>
        </Box>

    </Modal>
    <Box
    width={800}
    display='flex'
    justifyContent='space-between'>
   
      
      <TextField
      variant='outlined'
      label='Search Inventory'
      sx={{width:'400px'}}
      value={searchItem}
      onChange={(e)=>
        setSearchItem(e.target.value)
      }
    />
   <Button
   variant='contained'
   onClick={()=>
    inventory.map(({searchItem,quantity})=>(
      <Box  
      
          key={searchItem}
          width='100%'
          height={'100px'}
          display={'grid'}
          gridTemplateColumns='300px 50px 150px 150px'
          ><Typography
          variant='h4'
          color='#333'
          textAlign='center'
          fontFamily='Segoe UI'

          >{searchItem.charAt(0).toUpperCase()+searchItem.slice(1)}</Typography>
          <Typography
           variant='h4'
           color='#333'
           textAlign='center'
          >{quantity}
          </Typography></Box>

  ))}>Search</Button>
    <Button variant='contained' 
    onClick={()=>{
      handleOpen()
    }}>Add New Item</Button>
    </Box>
    <Box
      // border='1px solid #333'
      border={1}
      borderRadius={2}
    >
      <Box  
        width="800px"
        height="100px"
        bgcolor="#ADD8E6"
        display='flex'
        alignItems='center'
        justifyContent='center'
      > <Typography variant='h2' color="#333" fontFamily='Segoe UI'
      >Inventory Items</Typography>

      </Box>
    </Box>
    <Stack
    width='800px'
    height='800px'
    spacing={2}
    overflow='auto'
    >{
      inventory.map(({name,quantity})=>(
          <Box  
          key={name}
          width='100%'
          height={'100px'}
          display={'grid'}
          gridTemplateColumns='300px 50px 150px 150px'
          gap={3}
          alignItems={'center'}
          justifyContent={'flex-start'}
          bgColor='#f0f0f0'
          padding={3}
          border={1}
          borderRadius={2}>
          
          
          
            <Typography
            variant='h4'
            color='#333'
            textAlign='center'
            fontFamily='Segoe UI'

            >{name.charAt(0).toUpperCase()+name.slice(1)}</Typography>
            <Typography
             variant='h4'
             color='#333'
             textAlign='center'
            >{quantity}
            </Typography>
            <Button
            variant='contained'
            onClick={()=>
              addItem(name)
            }>Add</Button>
            <Button
            variant='contained'
            onClick={()=>{
              removeItem(name)
            }}
            >Remove</Button>

          </Box>
      ))
    }

    </Stack>
  </Box>
  
  )}
