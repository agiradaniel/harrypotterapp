'use client'

import React, { useEffect, useState } from 'react';
import { useParams} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import HarryOutline from '../../components/images/celebrity-potter.jpg';
import { AiFillHome } from 'react-icons/ai';
import './character.css'
import Banner from '../../components/inc/banner';

interface CharacterData {
  id: string;
  name: string;
  species: string;
  house: string;
  eyeColour: string;
  wand: {
    wood: string;
    core: string;
    length: string;
  };
  dateOfBirth: string;
}

const Character: React.FC = () => {
  const [specificCharacter, setSpecificCharacter] = useState<CharacterData[]>([]);
 
  const { id } = useParams();

  useEffect(() => {
    const retrieveSpecificData = async () => {
      
      if (id && typeof id === 'string') {
        const response = await axios.get(`https://hp-api.onrender.com/api/character/${id}`);
        setSpecificCharacter(response.data);
      }
    };

    retrieveSpecificData();
  }, [id]);

  return (
    <>
      
      <Banner/>


      <Link href="/harrypotterapp" passHref>
        <AiFillHome style={{ margin: '10px 0 0 5px', width: '30px', height: '30px' }}/>
      </Link>

      {specificCharacter.map((character) => {
        return (
          <div key={character.id} className='mainCard'>
            <div className='imageDiv'>
              <Image src={HarryOutline} alt="Top Banner" className="h-auto"/>
            </div>

            <div className='characterList' style={{color: 'white', textAlign: 'center', margin: '10px auto', fontWeight: 'bold', listStyle:"none"}}>
              <h3 style={{ textDecoration: 'underline' }}>Character</h3>
              <li>{character.name}</li>
              <li>Species: {character.species}</li>
              <li>House: {character.house}</li>
              <li>Eye Color: {character.eyeColour}</li>
              <li>DOB: {character.dateOfBirth || 'none'}</li>
              <h4 style={{ textDecoration: 'underline' }}>Wand</h4>
              <li>Wood: {character.wand?.wood || 'none'}</li>
              <li>Core: {character.wand?.core || 'none'}</li>
              <li>Length: {character.wand?.length || 'none'}</li>
              
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Character;
