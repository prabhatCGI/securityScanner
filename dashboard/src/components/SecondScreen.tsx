import axios from 'axios'
import { useState } from 'react'
import { Header, Table, Rating, Container, Icon, Label, Popup, Button, Modal, Form } from 'semantic-ui-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export function SecondScreen() {

  const [open, setOpen] = useState(false)
  const [apiData, setApiData] = useState([]);
  const [line, setLine] = useState('');
  const [status, setStatus] = useState('');
  const [repoName, setRepoName] = useState('');
  const [severity, setSeverity] = useState('');
  const [type, settype] = useState('');
  const [ruleId, setRuleId] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [queuedAt, setQueuedAt] = useState('');
  const [scanningAt, setscanningAt] = useState('');
  const [finishedAt, setFinishedAt] = useState('');
  const [currentModalID, setCurrentModalID] = useState('');



  const getAllData = async () => {
    await axios.get("http://localhost:4000/allScans").then((response) => {
      console.log(response.data.allData);
      return setApiData(response.data.allData);
    })
      .catch((err) => { console.log(err) });
  }

  const deleteData = (id: any) => {
    axios.delete(`http://localhost:4000/delete/${id}`).then((res) => {
      console.log(res);
      getAllData();
    })
  }

  function checkVal(e: any) {
    let element=e.target;
   console.log(element.innerText);
   setStatus(element.innerText); 
   }

  let dataToSend = {
    status: status,
    repositoryName: repoName,
    findings: [{ type: type, ruleID: ruleId, location: { path: path, positions: { begin: { line: line } } }, metadata: { description: description, severity: severity }}],
    queuedAt: queuedAt,
    scanningAt: scanningAt,
    finishedAt: finishedAt
  }

  const showEditOptions = () => {
    console.log(currentModalID);
    axios.put(`http://localhost:4000/put/${currentModalID}`, dataToSend).then((response) => {
      console.log(response);
      getAllData();
      setOpen(false);
    })
      .catch((err) => { console.log(err) });
  }

  const EditModal = (id: any) =>{
    setOpen(true);
    setCurrentModalID(id);
  }

  function setValueData(event: any, func: any) {
    func(event.target.value);
  }

  useEffect(() => {
    getAllData();
  }, [])

  const options = [
    { key: 'm', text: 'Queued', value: 'queued' },
    { key: 'f', text: 'In Progress', value: 'in progress' },
    { key: 'o', text: 'Success', value: 'success' },
    { key: 'p', text: 'Failure', value: 'failure' },

  ]

  const printData = (id: any) =>
  {
    console.log(id)
    window.location.href=`/thirdPage/${id}`
  }

  return (
    
    <Container>
      <br />
      {open === false ? 
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

          {apiData.map(({ _id, id, repositoryName, status, queuedAt }) =>
            <>
          
            <Table.Row>
                <Table.Cell onClick ={()=>printData(_id)}>{_id}</Table.Cell >
                <Table.Cell onClick ={()=>printData(_id)}>{repositoryName}</Table.Cell>
                <Table.Cell onClick ={()=>printData(_id)}>{status}</Table.Cell>
                <Table.Cell onClick ={()=>printData(_id)}>{queuedAt}</Table.Cell>
                <Table.Cell onClick={() => EditModal(_id)}><Icon disabled name='pencil' /></Table.Cell>
                <Table.Cell onClick={() => deleteData(_id)}><Icon disabled name='trash' /></Table.Cell>
              </Table.Row>
            
            
            
            </>
          )}
        </Table.Body>
      </Table>
        : 
      <Modal
        closeIcon
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon='pencil' content='Edit Scan' />
        <Modal.Content>
          <p>
            Please Select New Values
          </p>
          <Form >
            <Form.Group widths='equal'>
              <Form.Select
                fluid
                label='Status'
                options={options}
                placeholder='Status'
                onClick={checkVal}
              >
              </Form.Select>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Repository Name' onChange={(e) => setValueData(e, setRepoName)} placeholder='Repository Name' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Type' placeholder='Type' onChange={(e) => setValueData(e, settype)} />
              <Form.Input fluid label='Rule ID' placeholder='Rule ID' onChange={(e) => setValueData(e, setRuleId)} />
              <Form.Input fluid label='Path' placeholder='Path' onChange={(e) => setValueData(e, setPath)} />
              <Form.Input fluid label='Line' placeholder='Line' onChange={(e) => setValueData(e, setLine)} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Description' placeholder='Description' onChange={(e) => setValueData(e, setDescription)} />
              <Form.Input fluid label='Severity' placeholder='Severity' onChange={(e) => setValueData(e, setSeverity)} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input type="datetime-local" fluid label='QueuedAt' onChange={(e) => setValueData(e, setQueuedAt)} />
              <Form.Input type="datetime-local" fluid label='ScanningAt' onChange={(e) => setValueData(e, setscanningAt)} />
              <Form.Input type="datetime-local" fluid label='FinishedAt' onChange={(e) => setValueData(e, setFinishedAt)} />
            </Form.Group>
            <br />
            <Form.Button onClick={() => showEditOptions()} type='submit'>Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
      }
    </Container>
  );
}

export default SecondScreen;
