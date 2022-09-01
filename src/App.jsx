import { useEffect, useState } from "react";
import minimaLogo from './minima_logo.png';
import './App.css';
import ReceiveTransaction from "./ReceiveTransaction";
import CreateTokenForm from "./CreateTokenForm";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AppsIcon from '@mui/icons-material/Apps';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function App() {
  const [data, setData] = useState();
  const [value, setValue] = useState();
  useEffect(() => {
    window.MDS.init((msg) => {
      if (msg.event === 'MAXIMA') {
        console.log(msg);
        if (msg.data.data) {
          //TODO: you could check here for correct application
          setData(msg.data.data);
        }
      }
    });
  }, []);

  return (
    <div className="App">
      <section className="container">
        <img src={minimaLogo} className="logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code>.
        </p>
        <CreateTokenForm />
        {data ? <ReceiveTransaction data={data} /> : ''}
      </section>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Explore" icon={<AppsIcon />} />
        <BottomNavigationAction label="My Items" icon={<WebStoriesIcon />} />
        <BottomNavigationAction label="Inbox" icon={<MailOutlineIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;