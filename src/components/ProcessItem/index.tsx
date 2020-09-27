import React from 'react';
import api from '../../services/api';

export interface Process {
  id?: number;
  numero_processo?: string;
  solicitante: {
    id?:number;
    nome?: string;
    cep?: string;
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
  },
  data_do_processo: string,
  data_de_criacao: string,
  anexo: string
}

interface ProcessItemProps {
  process: Process;
}

const ProcessItem: React.FC<ProcessItemProps> = ({ process }) => {
  // function createNewConnection() {
  //   api.post('connections', {
  //     user_id: process.id,
  //   })
  // }

  return (
    <tr className="process-item">
      <td>{process.numero_processo}</td>
      <td>{process.solicitante.nome}</td>
      <td>{process.data_do_processo}</td>
      <td>{process.anexo}</td>
      <td>
        <span className="edit-process">
          <img src="" alt=""/>
        </span>
      </td>
    </tr>  
  );
}

export default ProcessItem;