'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Banner from './components/inc/banner';

const Home: React.FC = () => {
  const [character, setCharacter] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCharacter, setFilteredCharacter] = useState<any[]>([]);

  useEffect(() => {
    const retrieveData = async () => {
      const response = await axios.get(`https://hp-api.onrender.com/api/characters`);
      setCharacter(response.data);
    };

    retrieveData();
  }, []);

  useEffect(() => {
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
  }, [searchQuery, character]);

  return (
    <>
      
      <Banner/>

      <div style={{ textAlign: 'center', margin: '20px auto' }}>
        <input type="text" placeholder="Search by name or house..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '200px',
            height: '50px',
            borderRadius: '10px',
            margin: 'auto',
            textAlign: 'center',
            objectFit: 'cover',
          }}
        />
      </div>

      <div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', flexWrap: 'wrap', justifyContent: 'center', width: '100%'}}>
        {filteredCharacter.map((char) => {
          return (
            <Link key={char.id} href={`/harrypotterapp/character/${char.id}`} passHref style={{
              textDecoration: 'none',
              color: 'inherit',
            }}>
              
                <div style={{width: '250px', height: '150px', margin: '20px', backgroundColor: '#D6B445', textAlign: 'center', borderRadius: '5px',color: 'white'}}>
                  <div style={{backgroundColor: 'white', width: '99%', height: '50px', border: '1px solid #D6B445', borderRadius: '5px 5px 0 0', margin: 'auto', color: 'black',}}>
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
  );
};

export default Home;
