import React from 'react'
import { Header, Table, Rating, Container, Icon, Label } from 'semantic-ui-react'
import { json } from 'stream/consumers'

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

                <Table.Row  onClick={() => {console.log("Hello World")}}>
                    <Table.Cell>{scanData.findings[0].ruleId}</Table.Cell>
                    <Table.Cell>{scanData.findings[0].metadata.description}</Table.Cell>
                    <Table.Cell>{scanData.findings[0].metadata.severity}</Table.Cell>
                    <Table.Cell>{scanData.findings[0].location.path}</Table.Cell>
                    <Table.Cell>{scanData.findings[0].location.positions.begin.line}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Container>
)
}