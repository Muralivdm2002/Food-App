import './App.css';
import Home from './Pages/Home';
import ThemeSwitch from './Components/Theme/ThemeSwitch';
import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

function App() {

  const [theme,setTheme] = useState(false)

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      <div style={theme? {backgroundColor: "black"}: {}} className="app">
        <ThemeSwitch />
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
