import  React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';

import accountImg from '../../assets/images/account_circle-black-18dp.svg';
import './styles.css';

function SignIn() {

	const history = useHistory;

	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	return (
		<div id="page-signin" className="container">
			<main>
				<div className="card">
					<div className="card-header">
						<img src={accountImg} alt="Conta de Usuário"/>
					</div>
					<form>
						<div className="card-body">
							<div className="card-body-header">
								<h3>Entrar</h3>
							</div>
							<div className="card-body-content">
								<div className="formgroup">
									<Input
										name="email"
										label="Email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>

									<Input
										name="senha"
										label="Senha"
										type="password"
										value={senha}
										onChange={(e) => setSenha(e.target.value)}
									/>
								</div>
							</div>
							<div className="card-body-footer">
								<div className="formgroup">
									<button type="submit">Entrar</button>
								</div>
							</div>	
						</div>
					</form>
				</div>
			</main>	
		</div>
	);
}

export default SignIn;

