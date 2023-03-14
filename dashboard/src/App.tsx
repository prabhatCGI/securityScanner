import React, { useState } from 'react';
import './App.css';
import { FirstScreen } from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';
import { ThirdScreen } from './components/ThirdScreen';
import { Button, Grid } from 'semantic-ui-react';

function App() {
  const [currentPage, setCurrentPage] = useState("firstPage");

  return (
    <div className="App">
      <div>
      <Grid.Column>
        <Button content='First Screen' primary onClick={() => setCurrentPage("firstPage")} />
        <Button content='Second Screen' primary onClick={() => setCurrentPage("secondPage")} />
        <Button content='Third Screen' primary onClick={() => setCurrentPage("thirdPage")} />
      </Grid.Column>

      {/* <Grid columns={2} padded>
      <Grid.Column>
        <Button content='First Screen' primary onClick={() => setCurrentPage("firstPage")} />
      </Grid.Column>
      <Grid.Column>
        <Button content='Second Screen' primary onClick={() => setCurrentPage("secondPage")} />
      </Grid.Column>
      <Grid.Column>
        <Button content='Third Screen' primary onClick={() => setCurrentPage("thirdPage")} />
      </Grid.Column>
    </Grid> */}

      </div>
      {currentPage === "firstPage" ? <FirstScreen /> : ''}
      {currentPage === "secondPage" ? <SecondScreen /> : ''}
      {currentPage === "thirdPage" ? <ThirdScreen /> : ''}
    </div>
  );
}

export default App;
