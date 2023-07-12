import React from 'react';
import { useRef } from 'react';
import { Container } from 'react-bootstrap'
import FormPage1 from '../components/FormPage1'
import FormPage2 from '../components/FormPage2'
import FormPage3 from '../components/FormPage3'
import FormPage4 from '../components/FormPage4'
import Card from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react'
import Tab from 'react-bootstrap/Tab';

function SignUpPage() {
  const [inputs, setInputs] = useState({});
  const [page, setPage] = useState(1);
  const formRef = useRef(null);

  function formSubmit(event){
    event.preventDefault()
    setInputs({})
    event.target.reset()
  }

  function changePage(event, step=1){
    if(formRef.current.reportValidity()){
      setPage(page+step)
    }
  }
  function selectPage(p){
    if(formRef.current.reportValidity()){
      setPage(p)
    }
  }

  function changeHandler(event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    if(event.target.willValidate){
      setInputs({...inputs, [name]: {value: value, error: event.target.validationMessage}})
    } else {
      setInputs({...inputs, [name]: {value: value, error: ''}})
    }
  }

  return (
    <Container className="mt-4">
      <Form ref={formRef} onSubmit={formSubmit} onInvalid={changeHandler}>
        <Tabs
          defaultActiveKey="1"
          className="mb-3"
          activeKey={page}
          inputs={inputs}
          onSelect={selectPage}
        >
          <Tab eventKey="1" title="Login info">
            <FormPage1 changeHandler={changeHandler} inputs={inputs} />
          </Tab>
          <Tab eventKey="2" title="Movies preferences">
            <FormPage2 changeHandler={changeHandler} inputs={inputs} />
          </Tab>
          <Tab eventKey="3" title="Contact">
            <FormPage3 changeHandler={changeHandler} inputs={inputs} />
          </Tab>
          <Tab eventKey="4" title="Contact">
            <FormPage4 changeHandler={changeHandler} inputs={inputs} />
          </Tab>
        </Tabs>
        {page>1?(
          <Button onClick={(e)=>changePage(e,-1)}>
            Last page
          </Button>
        ):null}
        {page<4?(
          <Button onClick={(e)=>changePage(e)}>
            Next page
          </Button>
        ):null}
        {page>1?(
          <Button type="submit">
            Submit
          </Button>
        ):null}
      </Form>
    </Container>
  );
}

export default SignUpPage;
