'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Banner from './components/inc/banner';
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS;
import './styles/mainpage.css'

interface Character {
  id: number;
  name: string;
  dateOfBirth?: string;
  house?: string;
  image: string;
}

const Home: React.FC = () => {
  const [character, setCharacter] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCharacter, setFilteredCharacter] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try{
      const retrieveData = async () => {
        const response = await axios.get(`https://hp-api.onrender.com/api/characters`);
        setCharacter(response.data);
        setIsLoading(false)
      };
  
      retrieveData();
    }catch(error){
      toast.error("An error occurred while retrieving data.");
    }
    
  }, []);

  useEffect(() => {
    try{
    const filterCharacter = () => {
      if (searchQuery === '') {
        setFilteredCharacter(character);
      } else {
        const filtered = character.filter((char) =>
          char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (char.house && char.house.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredCharacter(filtered);
      }
    };
    filterCharacter();
    }catch(error){
      toast.error("An error occurred, try again later");
    }
  }, [searchQuery, character]);

  return (
    <>
      
      <Banner/>

      <ToastContainer position="top-right" autoClose={4000} />

      {!isLoading ? (
      <>

      <div className='searchArea text-center mx-auto my-5'>
        <input type="text" placeholder="Search by name or house..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className='w-52 h-14 rounded-lg mx-auto text-center object-cover'
        />
      </div>



      <div className='characterDetailsSection flex flex-row overflow-x-auto flex-wrap justify-center w-full'>
        {filteredCharacter.map((char) => {
          return (
            <Link key={char.id} href={`/harrypotterapp/character/${char.id}`} passHref style={{
              textDecoration: 'none',
              color: 'inherit',
            }}>
              
                <div className='characterCard w-64 h-40 m-5 text-white text-center rounded-md bg-cover bg-no-repeat' style={{backgroundColor: '#D6B445', backgroundImage: `url(${char.image})`}}>
                  <div className='bg-white w-99 h-14 border rounded-t-md m-auto text-black opacity-80' style={{border: '1px solid #D6B445'}}>
   
                    <h4>Character</h4>
                    
                  </div>
                  
                  <p>{char.name}</p>
                  <p>Born: {char.dateOfBirth || 'Not Specified'}</p>
                </div>
            
            </Link>
          );
        })}
      </div> 
      </>
      ):

      
      <div className="loaderSection mx-auto my-44 text-center w-28 h-28">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
  }
    </>
  );
};

export default Home;
