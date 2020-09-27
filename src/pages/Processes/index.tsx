import React, { FormEvent, useState } from 'react';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import ProcessItem, { Process } from '../../components/ProcessItem';
import api from '../../services/api';

import './styles.css';

import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export class DataState extends DataTable {

  emptyProcess = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
  };

  constructor(props: any) {
    super(props);
    this.state = {
      processes: null,
      processDialog: false,
      deleteProcessDialog: false,
      deleteProcesssDialog: false,
      process: this.emptyProcess,
      selectedProcesses: null,
      submitted: false,
      globalFilter: null
    };

    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveProcess = this.saveProcess.bind(this);
    this.editProcess = this.editProcess.bind(this);
    this.confirmDeleteProcess = this.confirmDeleteProcess.bind(this);
    this.deleteProcess = this.deleteProcess.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedProcesses = this.deleteSelectedProcesses.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteProcessDialog = this.hideDeleteProcessDialog.bind(this);
    this.hideDeleteProcessesDialog = this.hideDeleteProcessesDialog.bind(this);
  }

  componentDidMount() {
    this.state.processes.getProcesses()
      .then(
        data => this.setState({ processes: data })
    );
  }

  formatCurrency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  openNew() {
    this.setState({
      process: this.emptyProcess,
      submitted: false,
      processDialog: true
    });
  }

  hideDialog() {
    this.setState({
      submitted: false,
      productDialog: false
    });
  }

  hideDeleteProcessDialog() {
    this.setState({ deleteProcessDialog: false });
  }

  hideDeleteProcessesDialog() {
    this.setState({ deleteProcessesDialog: false });
  }

  saveProcess() {
    let state = { submitted: true };

    if (this.state.process.name.trim()) {
      let processes = [...this.state.processes];
      let product = {...this.state.product};
      if (this.state.product.id) {
          const index = this.findIndexById(this.state.product.id);

          processes[index] = product;
          this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
          product.id = this.createId();
          product.image = 'product-placeholder.svg';
          processes.push(product);
          this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      state = {
          ...state,
          processes,
          processDialog: false,
          process: this.emptyProcess
      };
      this.setState(state);
    }
  }

  editProcess(process: Processo) {
    this.setState({
      process: { ...process },
      productDialog: true
    });
  }

  confirmDeleteProcess(process: Processo) {
    this.setState({
      process,
      deleteProcessDialog: true
    });
  }

  deleteProcess() {
    let processes = this.state.processes.filter((val: Object) => val.id !== this.state.product.id);
    this.setState({
      processes,
      deleteProcessDialog: false,
      process: this.emptyProcess
    });
    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  }

  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.state.processes.length; i++) {
      if (this.state.processes[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId() {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  confirmDeleteSelected() {
    this.setState({ deleteProcessesDialog: true });
  }

  deleteSelectedProcesses() {
    let processes = this.state.processes.filter(val => !this.state.selectedProcesses.includes(val));
    this.setState({
      processes,
      deleteProcessesDialog: false,
      selectedProcesses: null
    });
    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Processes Deleted', life: 3000 });
  }

  onCategoryChange(e: Event) {
    let process = {...this.state.process};
    process['category'] = e.value;
    this.setState({ process });
  }

  onInputChange(e: Event, name: string) {
    const val = (e.target && e.target.value) || '';
    let process = {...state.process};
    process[`${name}`] = val;

    this.setState({ process });
  }

  onInputNumberChange(e: Event, name: string) {
    const val = e.value || 0;
    let process = {...this.state.process};
    process[`${name}`] = val;

    this.setState({ process });
  }

  leftToolbarTemplate() {
    return (
      <>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew } />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProcesses || !this.state.selectedProcesses.length} />
      </>
    )
  }

  rightToolbarTemplate() {
    return (
      <>
          <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
          <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
      </>
    );
  }

  imageBodyTemplate(rowData: DataTable) {
    return (
      <img 
        src={`showcase/demo/images/product/${rowData.image}`}
        alt={rowData.image}
        className="product-image"
      />
    );
  }

  priceBodyTemplate = (rowData: DataTable) => {
    return formatCurrency(rowData.price);
  }

  ratingBodyTemplate = (rowData: DataTable) => {
    return <Rating value={rowData.rating} readonly cancel={false} />;
  }

  statusBodyTemplate = (rowData: DataTable) => {
    return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
  }

  actionBodyTemplate = (rowData: DataTable) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={ () => editProcess(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProcess(rowData)} />
      </>
    );
  }

}

function Processes () {

  const estado = [estado, setEstado] = useState('');
  
  const processesInit = [
    {
      id: 1,
      anexo: '',
      data_de_criacao: '2020-09-26',
      data_do_processo: '2020-06-02',
      numero_processo: '2020000001',
      solicitante: {
        id: 1,
        nome: 'Jefferson',
        cep: '58056560',
        rua: 'Pedro Henrique de Araujo',
        numero: '497',
        bairro: 'Mangabeira',
        cidade: 'João Pessoa'
      }      
    },
    {
      id: 1,
      anexo: '',
      data_de_criacao: '2020-09-26',
      data_do_processo: '2020-06-02',
      numero_processo: '2020000001',
      solicitante: {
        id: 1,
        nome: 'Jefferson',
        cep: '58056560',
        rua: 'Pedro Henrique de Araujo',
        numero: '497',
        bairro: 'Mangabeira',
        cidade: 'João Pessoa'
      }      
    },
    {
      id: 1,
      anexo: '',
      data_de_criacao: '2020-09-26',
      data_do_processo: '2020-06-02',
      numero_processo: '2020000001',
      solicitante: {
        id: 1,
        nome: 'Jefferson',
        cep: '58056560',
        rua: 'Pedro Henrique de Araujo',
        numero: '497',
        bairro: 'Mangabeira',
        cidade: 'João Pessoa'
      }      
    }
  ];
  
  const [processes, setProcesses] = useState([]);
  const [numero_processo, setNumeroProcesso] = useState('');
  const [nome_solicitante, setNomeSolicitante] = useState('');

  const header = () => {
    return (
      <div className="table-header">
        <h5 className="p-m-0">Gerenciar Processos</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setState({ globalFilter: e.target.value })} placeholder="Search..." />
        </span>
      </div>
    );
  }    
  const productDialogFooter = () => {
    return (
      <>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ saveProcess() } />
      </>
    );
  }
  const deleteProcessDialogFooter = () => {
    return (
      <>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProcessDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProcess} />
      </>
    );
  }
  const deleteProcessesDialogFooter = () => {
    return (
      <>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProcessesDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProcesses} />
      </>
    );
  }    

  async function getProcesses(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('processos', {
      params: {
        numero_processo,
        nome_solicitante,
      }
    });

    setProcesses(response.data);
  }

  return (
    <div id="page-processos" className="container">
      <PageHeader 
          title="Processos"
      />
      <main>  
        <div className="body-content">
          <div className="form-processes">
            <form id="search-processos" onSubmit={ getProcesses }>
              <Input 
                name="numero_processo" 
                label="Número do processo"
                type="text"
                maxLength={10}
                minLength={10}
                pattern="[0-9]{10}"
                value={numero_processo}
                onChange={(e) => { setNumeroProcesso(e.target.value) }}
              />
              <Input 
                name="nome_solicitante" 
                label="Nome"
                type="text"
                value={nome_solicitante}
                onChange={(e) => { setNomeSolicitante(e.target.value) }}
              />
                
              <button type="submit">
                Buscar
              </button>
            </form>
          </div>
          <div className="divisor">

          </div>
          {/* <div className="table-processes">
            <table>
              <thead>
              
              </thead>
              <tbody>
                <tr>
                  <th>Processo</th>
                  <th>Nome solicitante</th>
                  <th>Data do processo</th>
                  <th>Anexo</th>
                  <th></th>
                </tr>
                
                { processes == null &&              
                  <tr>
                    <td colSpan={5}>
                      "Nenhum registro encontrado!"
                    </td>
                  </tr>
                }
                                 
                { processes.map((process: Process) => {
                   return <ProcessItem key={process.id} process={process} />;
                })}
              </tbody>
              <tfoot>

              </tfoot>
            </table>
          </div> */}

          <div className="datatable-crud-demo"> 
            {/* <Toast ref={(el) => this.toast = el} /> */}

            <div className="card">
              {/* <Toolbar className="p-mb-4" left={ leftToolbarTemplate } right={ rightToolbarTemplate }></Toolbar> */}
              <Toolbar className="p-mb-4" left={ leftToolbarTemplate }></Toolbar>

              <DataTable ref={(el) => this.dt = el} value={this.state.processes} selection={this.state.selectedProcesses} onSelectionChange={(e) => this.setState({ selectedProcesses: e.value })}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} processos"
                globalFilter={this.state.globalFilter}
                header={header}>

                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="code" header="Code" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column header="Image" body={ imageBodyTemplate }></Column>
                <Column field="price" header="Price" body={ priceBodyTemplate } sortable></Column>
                <Column field="category" header="Category" sortable></Column>
                <Column field="rating" header="Reviews" body={ ratingBodyTemplate } sortable></Column>
                <Column field="inventoryStatus" header="Status" body={ statusBodyTemplate } sortable></Column>
                <Column body={ actionBodyTemplate }></Column>
              </DataTable>
            </div>

            <Dialog visible={this.state.productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                {this.state.product.image && <img src={`showcase/demo/images/product/${this.state.product.image}`} alt={this.state.product.image} className="product-image" />}
              <div className="p-field">
                <label htmlFor="name">Name</label>
                <InputText id="name" value={this.state.product.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.name })} />
                  {this.state.submitted && !this.state.product.name && <small className="p-invalid">Name is required.</small>}
              </div>

              <div className="p-field">
                <label htmlFor="description">Description</label>
                <InputTextarea id="description" value={this.state.product.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={20} />
              </div>

              <div className="p-field">
                <label className="p-mb-3">Category</label>
                <div className="p-formgrid p-grid">
                  <div className="p-field-radiobutton p-col-6">
                    <RadioButton id="category1" name="category" value="Accessories" onChange={this.onCategoryChange} checked={this.state.product.category === 'Accessories'} />
                    <label htmlFor="category1">Accessories</label>
                  </div>
                  <div className="p-field-radiobutton p-col-6">
                    <RadioButton id="category2" name="category" value="Clothing" onChange={this.onCategoryChange} checked={this.state.product.category === 'Clothing'} />
                    <label htmlFor="category2">Clothing</label>
                  </div>
                  <div className="p-field-radiobutton p-col-6">
                    <RadioButton id="category3" name="category" value="Electronics" onChange={this.onCategoryChange} checked={this.state.product.category === 'Electronics'} />
                    <label htmlFor="category3">Electronics</label>
                  </div>
                  <div className="p-field-radiobutton p-col-6">
                    <RadioButton id="category4" name="category" value="Fitness" onChange={this.onCategoryChange} checked={this.state.product.category === 'Fitness'} />
                    <label htmlFor="category4">Fitness</label>
                  </div>
                </div>
              </div>

              <div className="p-formgrid p-grid">
                <div className="p-field p-col">
                  <label htmlFor="price">Price</label>
                  <InputNumber id="price" value={this.state.product.price} onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                </div>
                <div className="p-field p-col">
                  <label htmlFor="quantity">Quantity</label>
                  <InputNumber id="quantity" value={this.state.product.quantity} onValueChange={(e) => this.onInputNumberChange(e, 'quantity')} integeronly />
                </div>
              </div>
            </Dialog>

            <Dialog visible={this.state.deleteProcessDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProcessDialogFooter} onHide={this.hideDeleteProcessDialog}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                  {this.state.product && <span>Are you sure you want to delete <b>{this.state.product.name}</b>?</span>}
              </div>
            </Dialog>

            <Dialog visible={this.state.deleteProcessesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProcessesDialogFooter} onHide={this.hideDeleteProcessesDialog}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                  {this.state.product && <span>Tem certeza que deseja excluir os produtos selecionados?</span>}
              </div>
            </Dialog>
          </div>
        </div>          
      </main>
    </div>
  );
}
// }
export default Processes;