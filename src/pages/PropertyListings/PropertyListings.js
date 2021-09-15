import React, { useEffect, useState } from 'react';
import Header from 'components/layout';
import ImageCard from 'components/card';
import axios from 'axios';

export default function PropertyListings() {
  const [estates, setEstates] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    async function fetchData () {
      let res = await axios.get('https://api.simplyrets.com/properties', {
        auth: {
          username: 'simplyrets',
          password: 'simplyrets',
        },
      });
      const { data } = res;
      setEstates(data);
      localStorage.setItem('estates', JSON.stringify(data));
    }

    if(localStorage.getItem('estates')) {
      fetchData()
    }
    else {
      const data = JSON.parse(localStorage.getItem('estates'))
      setEstates(data);
    }
  }, []);

  const saveFavorites = (id) => {
    let temp = favorites;
    if(temp.includes(id)) temp.splice(temp.indexOf(id), 1)
    else temp.push(id)
    setFavorites([...temp])
    localStorage.setItem('favorites', JSON.stringify(temp));
  }

  return (
    <div id='property-listings-container'>
      <Header name="Property Listings" />
      {estates.length > 0 &&
        <div className="max-w-1182px px-17px sm:px-60px mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-58px mt-38px">
          {estates.map((estate, index) => (
            <ImageCard key={index} index={index} estate = {estate} saveFavorites={(id) => saveFavorites(id)} favorites = {favorites}/>
          ))}
        </div>
      }
    </div>
  );
}