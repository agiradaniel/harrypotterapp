'use client'

import React, { useEffect, useState } from 'react';
import { useParams} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import HarryOutline from '../../components/images/celebrity-potter.jpg';
import { AiFillHome } from 'react-icons/ai';
import '../../styles/character.css'
import Banner from '../../components/inc/banner';
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS;


interface CharacterData {
  id: string;
  name: string;
  species: string;
  house: string;
  eyeColour: string;
  image: string;
  wand: {
    wood: string;
    core: string;
    length: string;
  };
  dateOfBirth: string;
}

const Character: React.FC = () => {
  const [specificCharacter, setSpecificCharacter] = useState<CharacterData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
 
  const { id } = useParams();

  useEffect(() => {
    try{
      const retrieveSpecificData = async () => {
      
        if (id && typeof id === 'string') {
          const response = await axios.get(`https://hp-api.onrender.com/api/character/${id}`);
          setSpecificCharacter(response.data);
          setIsLoading(false)
        }
      };
  
      retrieveSpecificData();
    }catch(error){
      toast.error("An error occurred while retrieving data.");
    }
    
  }, [id]);

  return (
    <>
      
      <Banner/>

      <ToastContainer position="top-right" autoClose={4000} />

      <Link className='homeIconButton' href="/harrypotterapp" passHref>
        <AiFillHome className='mt-2.5 ml-1.5 w-8 h-8'/>
      </Link>

      {!isLoading ?
        <div className='characterDisplay'>

        {specificCharacter.map((character) => {
        return (
          
          <div key={character.id} className='mainCard'>
            <div className='imageDiv'>
              {character.image ?
              <img src={character.image}/>:
              <Image src={HarryOutline} alt="Top Banner" className="h-auto"/>
              }
              
            </div>

            <div className='characterList text-white text-center my-2.5 mx-auto font-bold list-none'>
              <h3 className="underline underline-offset-4">Character</h3>
              <li>{character.name}</li>
              <li>Species: {character.species}</li>
              <li>House: {character.house}</li>
              <li>Eye Color: {character.eyeColour}</li>
              <li>DOB: {character.dateOfBirth || 'none'}</li>
              <h4 className="underline underline-offset-4">Wand</h4>
              <li>Wood: {character.wand?.wood || 'none'}</li>
              <li>Core: {character.wand?.core || 'none'}</li>
              <li>Length: {character.wand?.length || 'none'}</li>
              
            </div>
          </div>
        );
        })}
        </div>

        :

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

export default Character;
