import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Form, SubmitButton, List } from './Styled'
import Container from '../../components/Container/index'

import { Link } from 'react-router-dom'

import api from '../../services/Api';

export default class pages extends Component{
  state = {
    newRepository: '',
    repositoryData: [],
    loading: false,
  }

  handleInputChange = event => {
    this.setState({
      newRepository: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({
      loading: true
    })

    const { newRepository, repositoryData } = this.state

    const response = await api.get(`/repos/${newRepository}`)

    const data = {
      name: response.data.full_name,
    }
    
    this.setState({
      repositoryData: [ ...repositoryData, data ],
      newRepository: '',
      loading: false,
    })
    
  }

  componentDidMount(){
    const repositories = localStorage.getItem('repositories')

    if(repositories){
      this.setState({
        repositoryData: JSON.parse(repositories)
      })
    }
  }

  componentDidUpdate(_, prevState){

    const { repositoryData } = this.state

    if( prevState.repositoryData !== repositoryData ){
      localStorage.setItem('repositories', JSON.stringify(repositoryData))
    }
  }

  render(){

    const { newRepository, loading, repositoryData } = this.state

    return (
      <Container>
        <h1>
          <FaGithubAlt/>
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            placeholder='Adicionar Repositório'
            value={newRepository}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {
              loading ? (
                <FaSpinner color='#fff' size={16} />
              ) : (
                <FaPlus color='#fff' size={16} />
              )
            }
          </SubmitButton>
        </Form>
            <List>
              {repositoryData.map(repository => (
                <li key={repository.name}>
                  <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                </li>
              ))}
            </List>
      </Container>
    );
  }
}
