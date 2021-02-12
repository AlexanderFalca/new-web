import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Header, RepositoriesInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count:number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

const Repositories:React.FC = () => {

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([])
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(()=>{
    async function loadData(): Promise<void> {
     const [repository, issues] = await Promise.all([
      api.get(`repos/${params.repository}`),
      api.get(`repos/${params.repository}/issues`),
    ])
    setRepository(repository.data);
    setIssues(issues.data);
  }
  loadData();
  },[params.repository])

    return (
      <>
      <Header>
      <img src={logoImg} alt="Github Explorer" width={270} height={40} />
      <Link to="/" >
        <FiChevronLeft size={20} />
        Voltar
        </Link>
      </Header>
        {repository && (
          <RepositoriesInfo>
          <header>
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
           />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li><li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li><li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoriesInfo>
        )} 
        <Issues>
          {issues.map(issue => (
        <a key={issue.id} href={issue.html_url} >
        <div>
          <strong>{issue.title}</strong>
          <p>{issue.user.login}</p>
        </div>
        <FiChevronRight size={20} />
        </a>
          ))}
        </Issues>
        </>
    );
  }
  
  export default Repositories;