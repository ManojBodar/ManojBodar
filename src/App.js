import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        console.log('response', response);
        console.log('response Data', response.data);
        setPhotos(response.data);
      } catch (error) {
        console.log("Error! from get Apis", error);
      }
    };
    getPhotos();
  }, []);

  return (
    <>
      <div className="container">
        <h1>All Photos from API</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>AlbumId</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Url</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                photos.map((photo) => (
                  <TableRow key={photo.id}>
                    <TableCell>{photo.id}</TableCell>
                    <TableCell>{photo.albumId}</TableCell>
                    <TableCell>{photo.title}</TableCell>
                    <TableCell><img src={photo.url} alt={photo.title} height={100} width={100} /></TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default App;
