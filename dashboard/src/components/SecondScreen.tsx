import axios from 'axios'
import { useState } from 'react'
import { Header, Table, Rating, Container, Icon, Label, Popup, Button } from 'semantic-ui-react'
import { useEffect } from 'react'

export function SecondScreen() {

  const [open, setOpen] = useState(false)
  const [apiData, setApiData] = useState([]);

  const getAllData = async () => {
    await axios.get("http://localhost:4000/allScans").then((response) => {
      return setApiData(response.data.allData);
    })
      .catch((err) => { console.log(err) });
  }

  useEffect(() => {
    getAllData();
  }, [])

  const onTableClick = () =>{
    console.log("working")
  }


  return (
    <Container>
      <br />
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Repository Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Timestamp</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

        {apiData.map(({id, repositoryName, status, queuedAt }) =>  
        <>
        <Table.Row onClick={() => {
            onTableClick();
          }}>
          <Table.Cell>{id}</Table.Cell >
          <Table.Cell>{repositoryName}</Table.Cell>
          <Table.Cell>{status}</Table.Cell>
          <Table.Cell>{queuedAt}</Table.Cell>
          <Table.Cell><i><Icon disabled name='users'/></i></Table.Cell>
          <Table.Cell><Icon disabled name='trash'/></Table.Cell>
          </Table.Row>
          </>
        )}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default SecondScreen;
