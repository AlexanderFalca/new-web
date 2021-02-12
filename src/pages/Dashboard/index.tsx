import React, { FormEvent, useCallback, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Title, Form, Repositories, Error } from './styles';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard:React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!newRepo) {setInputError('Digite o autor/nome do repositório.'); return}

    try{
      const response = await api.get<Repository>(`/repos/${newRepo}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    }
    catch(error) {
      setInputError('Ocorreu um erro na busca deste repositório.');
      setNewRepo('');
    }
  },[newRepo, repositories])


    return (
      <>
      <img src={logoImg} alt="Github Explorer" width={270} height={40} />
      <Title>Explore os repositórios no Github </Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository} >
        <input
        value={newRepo}
        onChange={e => setNewRepo(e.target.value)} 
        placeholder="Digite o nome do repositório" 
        />
        <button type="submit" >Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error> }
      
      <Repositories>
        {repositories.map(repository => (
        <a key={repository.full_name} href="t" >
          <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
           />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20} />
        </a>
        ))}
        
      </Repositories>
      </>
    );
  }
  
  export default Dashboard;