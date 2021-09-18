import { useEffect, useState} from "react";

import Title from './components/Title'
import Dashboard from './components/Dashboard';

import classes from './App.module.css';

function App(){
  const [music, setMusic] = useState([]);
  const [filterMusic, setFilterMusic] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:8888/db').then(response => {
        return response.json();
    }).then(data => {
        const musicData = [];
        for(let key in data){
            if(key === 'id'){
                for(let i in data[key]){
                    musicData.push({
                      no: parseInt(i) + 1,
                      id: data[key][i]
                    });
                }
            }else{
                for(let i in data[key]){
                    musicData[parseInt(i)][key] = data[key][i];
                }
            }
          }
          setMusic(musicData);
          setFilterMusic(musicData);
      })
  },[]);

  const getSong = (songName) => {
    if(songName !== ''){
      const filteredSong = music.filter(song => {
          const songNameUpperCase = songName.toUpperCase();
          const songTitleUpperCase = song.title.toUpperCase();
          return songTitleUpperCase.includes(songNameUpperCase);
        });
        if(filteredSong.length > 0){
          setFilterMusic(filteredSong);
        }else{
          alert('No Such Song');
        }
    }else{
      setFilterMusic(music);
    }
  }
  
  return (
    <div className="App">
      <Title />
      <div className={classes.mainSection}>
        <div className={classes.card}>
          <Dashboard musicList={filterMusic} onGetSong={getSong}/>
        </div>
      </div>
    </div>
  );
}

export default App;

