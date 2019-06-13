import React, { useState } from 'react'
import './App.css'

import { Button, Input, Container, Row, Col, UncontrolledTooltip } from 'reactstrap'

import data from './isos.json'

const find = (key, value) => {
  return data.find(e => e[key] === value)
}

function App() {
  const [delimiter, setDelimiter] = useState('\n')
  const [format, setFormat] = useState('%s')
  const [joinString, setJoinString] = useState('\n')
  const [iso2, setIso2] = useState('')
  const [iso3, setIso3] = useState('')

  return (
    <Container>
      <Row style={{ marginTop: 50 }}>
        <Col>
          <h1 style={{ textAlign: 'center' }}>Convert country ISOs</h1>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col id="delimiter">
          Delimiter:
          <Input value={delimiter} onChange={e => setDelimiter(e.target.value || '\n')} />
          <UncontrolledTooltip placement="bottom" target="delimiter">
            Use to separate ISOs to convertion, blank is equal <code>\n</code>
          </UncontrolledTooltip>
        </Col>
        <Col id="format">
          Formater:
          <Input value={format} onChange={e => setFormat(e.target.value || '%s')} />
          <UncontrolledTooltip placement="bottom" target="format">
            Use to assign converted ISO in format, default is: <code>%s</code>
          </UncontrolledTooltip>
        </Col>
        <Col id="joinString">
          Separator:
          <Input value={joinString} onChange={e => setJoinString(e.target.value || '\n')} />
          <UncontrolledTooltip placement="bottom" target="joinString">
            Use to define which a separator of converted ISOs, blank is <code>\n</code>
          </UncontrolledTooltip>
        </Col>
      </Row>
      <Row style={{ marginTop: 30 }}>
        <Col>
          ISO 2
          <Input
            type="textarea"
            name="text"
            rows="17"
            id="exampleText"
            value={iso2}
            onChange={e => setIso2(e.target.value)}
          />
        </Col>
        <Col>
          ISO 3
          <Input
            type="textarea"
            name="text"
            rows="17"
            id="exampleText"
            value={iso3}
            onChange={e => setIso3(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col style={{ textAlign: 'right' }}>
          <Button
            onClick={() => {
              let lines2 = iso2.split(delimiter)
              let lines3 = []

              for (let i = lines2.length - 1; i >= 0; i--) {
                const line = lines2[i]
                let el = find('iso2', line)
                if (el) {
                  lines3.unshift(el.iso3)
                } else {
                  lines2.splice(i, 1)
                }
              }

              setIso2(lines2.join(delimiter))
              setIso3(lines3.map(e => format.replace('%s', e)).join(joinString))
            }}>
            {'>>'}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              let lines2 = []
              let lines3 = iso3.split(delimiter)

              for (let i = lines3.length - 1; i >= 0; i--) {
                const line = lines3[i]
                let el = find('iso3', line)
                if (el) {
                  lines2.unshift(el.iso2)
                } else {
                  lines3.splice(i, 1)
                }
              }

              setIso2(lines2.map(e => format.replace('%s', e)).join(joinString))
              setIso3(lines3.join(delimiter))
            }}>
            {'<<'}
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 100 }}>
        <Col>
          <h1 style={{ textAlign: 'center', fontSize: 12, color: 'rgb(116,116,116)' }}>
            Created with ♡ by{' '}
            <a href="https://github.com/welingtonsampaio" target="_blank">
              Welington Sampaio
            </a>
            .
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 style={{ textAlign: 'center', fontSize: 11, color: 'rgb(116,116,116)' }}>
            builded with{' '}
            <a href="https://facebook.github.io/create-react-app/docs/getting-started" rel="noFollow" target="_blank">
              react-create-app
            </a>{' '}
            and{' '}
            <a href="https://reactstrap.github.io/" rel="noFollow" target="_blank">
              reactstrap
            </a>
            .
          </h1>
        </Col>
      </Row>
    </Container>
  )
}

export default App
