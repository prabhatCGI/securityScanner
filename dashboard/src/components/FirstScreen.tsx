import { Form, Segment, Dropdown, Input, TextArea, Button, Select, Container, Message } from 'semantic-ui-react';
import { scanSchema } from '../interfaces/scanDataInterface';
import { useState } from 'react';
import axios from 'axios';
import SecondScreen from './SecondScreen';

export function FirstScreen() {

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
  const [ifSuccess, setIfSuccess] = useState(false);
  // const [pageOne, setPageOne]= useState('')


  function setValueData(event: any, func: any) {
    func(event.target.value);
  }

  const options = [
    { key: 'm', text: 'Queued', value: 'queued' },
    { key: 'f', text: 'In Progress', value: 'in progress' },
    { key: 'o', text: 'Success', value: 'success' },
    { key: 'p', text: 'Failure', value: 'failure' },

  ]

  let dataToSend = {
    status: status,
    repositoryName: repoName,
    findings: [{ type: type, ruleID: ruleId, location: { path: path, positions: { begin: { line: line } } }, metadata: { description: description, severity: severity } }],
    queuedAt: queuedAt,
    scanningAt: scanningAt,
    finishedAt: finishedAt
  }

  function checkVal(e: any) {
    let element = e.target;
    console.log(element.innerText);
    setStatus(element.innerText);
  }

  function sendScanDoc() {
    console.log(dataToSend);
    axios.post("http://localhost:4000/savescan", dataToSend)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setIfSuccess(true);
  }

  return (
    <Container>
      <br />
      <Segment>
        <Form >
          <Form.Group widths='equal'>
            <Form.Select
              fluid
              label='Status'
              options={options}
              placeholder='Status'
              onChange={checkVal}
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
          <Form.Button onClick={() => sendScanDoc()} type='submit'>Submit</Form.Button>
        </Form>

      </Segment>
      {ifSuccess ?
        <Message
          header='Scan Added Succesfully'
        />
        : " "}
    </Container>
  );
}
