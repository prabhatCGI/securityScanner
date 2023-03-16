import React, { useEffect, useState } from 'react'
import { Header, Table, Rating, Container, Icon, Label } from 'semantic-ui-react'
import { json } from 'stream/consumers'
import { useParams } from 'react-router-dom'
import axios from 'axios'


let scanData: any =
{
    findings: [
        {
            repositorName: "Something",
            scanStatus: "Fininshed",
            type: "sast",
            ruleId: "G402",
            location: {
                path: "connectors/apigateway.go",
                positions: {
                    begin: {
                        line: 60
                    }
                }
            },
            metadata: {
                description: "TLS InsecureSkipVerify set true.",
                severity: "HIGH"
            }
        },
        {
            repositorName: "Something Again",
            scanStatus: "Fininshed",
            type: "sast",
            ruleId: "G404",
            location: {
                path: "util/util.go",
                positions: {
                    begin: {
                        line: 32
                    }
                }
            },
            metadata: {
                description: "Use of weak random number generator (math/rand instead of crypto/rand)",
                severity: "HIGH"
            }
        }
    ]
}

console.log(scanData.findings[0].location.positions.begin.line)

export const ThirdScreen = () => {

    const [apiData, setApiData] = useState({});


    // const { _id } = useParams();
    // console.log(_id);
    var apiDataRes : any = ''
    const { id } = useParams<{id?: string}>();
    console.log(id)
    const getScanData = (id: any) => {
        console.log("RIGHT HERE")
        console.log(`http://localhost:4000/getOneRecord/${id}`);
        axios.get(`http://localhost:4000/getOneRecord/${id}`).then((response) => {
            console.log("working")
            console.log(response.data.allData);
            console.log(response.data.allData.findings[0].ruleID);
            console.log(response.data.allData.findings[0].type);
            apiDataRes = response.data.allData.findings[0];
        })
            .catch((err) => { console.log(err) });
    }


    useEffect(() => {
        getScanData(id);
    }, [])


    return (
        <Container>
            <br />
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Rule ID</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Severity</Table.HeaderCell>
                        <Table.HeaderCell>Path Name</Table.HeaderCell>
                        <Table.HeaderCell>Line Number</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    <Table.Row onClick={() => { console.log("Hello World") }}>
                        <Table.Cell>{apiDataRes.ruleId}</Table.Cell>
                        <Table.Cell>{apiDataRes.type}</Table.Cell>
                        {/* <Table.Cell>{apiDataRes.metadata.description}</Table.Cell> */}
                        {/* <Table.Cell>{apiDataRes.metadata.severity}</Table.Cell> */}
                        {/* <Table.Cell>{apiDataRes.location.path}</Table.Cell> */}
                        {/* <Table.Cell>{apiDataRes.location.positions.begin.line}</Table.Cell> */}
                    </Table.Row>
                </Table.Body>
            </Table>
        </Container>
    )
}