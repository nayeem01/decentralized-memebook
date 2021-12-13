import React from 'react';
import MemeCard from './meme/MemeCard';
import CreateMeme from './meme/CreateMeme';
const Home = () => {
  //   const pos = {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     justifyContent: 'center',
  //   };
  return (
    <div>
      <CreateMeme />
      <MemeCard />
    </div>
  );
};

export default Home;
