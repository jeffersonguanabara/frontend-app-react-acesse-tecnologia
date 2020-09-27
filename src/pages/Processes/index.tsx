import React from 'react';

function Processes () {
    
  return (
    <div id="page-processos" className="containner">
      <div className="formgroup">
        <div className="field">
          <label htmlFor="numero_processo" className="">Número do processo</label>
          <input id="numero_processo" type="text" placeholder="Número de processo"/>
        </div>
        <div className="field">
          <label htmlFor="nome_solicitante" className="">Nome do solicitante</label>
          <input id="nome_solicitante" type="text" placeholder="Nome Completo"/>
        </div>
        <button type="button"></button>
      </div>
    </div>
  );
}

export default Processes;