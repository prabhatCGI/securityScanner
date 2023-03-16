import React, { useState } from 'react';
import './App.css';
import { FirstScreen } from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';
import { ThirdScreen } from './components/ThirdScreen';
import { Button, Grid } from 'semantic-ui-react';
import { Route, Link, Routes, BrowserRouter } from "react-router-dom";


function App() {
  const [currentPage, setCurrentPage] = useState("firstPage");

  return (
    <div className="App">
      <div>
        <Grid.Column>
          <Button content='First Screen' href='/firstpage' primary />
          <Button content='Second Screen' href='/secondPage' primary />
          {/* <Button content='Third Screen' primary onClick={() => setCurrentPage("thirdPage")} /> */}
        </Grid.Column>

        <BrowserRouter>
          <Routes>
            <Route path='/firstPage/' element={<FirstScreen />} />
            <Route path='/secondPage/' element={<SecondScreen />} />
            <Route path='/thirdpage/:id' element={<ThirdScreen />} />
          </Routes>
        </BrowserRouter>

      </div>
      {/* {currentPage === "firstPage" ? <FirstScreen /> : ''}
      {currentPage === "secondPage" ? <SecondScreen /> : ''} */}
      {/* {currentPage === "thirdPage" ? <ThirdScreen /> : ''} */}
    </div>
  );
}

export default App;
