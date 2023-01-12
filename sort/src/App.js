import './App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';




export default function BasicCard() {

  const [data, setData] = useState([])
  const [searched, setSearched] = useState([])
  const [sorted, setSorted] = useState(false)

  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/products')
      .then(res => setData(res.data))



  }, [])

  

  const handleSearch = (val)=> 
  {
    const searchedData = data.filter(x => x.name.toLowerCase().includes(val.toLowerCase()))
  
    setSearched(searchedData.length === 0 ? false : searchedData)
  }

  const handleSorting =()=>{
    setData(data.sort((a, b) => a.unitPrice - b.unitPrice))
    setSorted(!sorted)
    if(searched.length > 0){
      setSearched(searched.sort((a, b) => a.unitPrice - b.unitPrice))
    }
  }


 

  return (
    <>

      <input onChange={e => handleSearch(e.target.value)} placeholder='Search for name' type='text' />
      <button onClick={handleSorting}>Filtera</button>


      {
        searched ? 
        (searched.length === 0 ? (data.map((element) => (
          <Card key={element.id} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {element.name}
              </Typography>
              <Typography variant="h5" component="div">
                {element.unitPrice}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))): 
        (searched.map((element) => (
          <Card key={element.id} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {element.name}
              </Typography>
              <Typography variant="h5" component="div">
                {element.unitPrice}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        )))): <div></div>
      }
    </>
  );

      }
