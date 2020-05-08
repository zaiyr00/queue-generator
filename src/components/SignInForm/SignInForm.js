import React, { Component } from 'react';
import './SignInForm.css';

const API = 'https://qr-queue-project.herokuapp.com/api/employee/all/';

class SignInForm extends Component {
	constructor() {
		super();

		this.state = {
			usersData: '',
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;

		this.setState({
			[name]: value
		});

		localStorage.setItem('email', this.state.email);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.checkingPasswordAndLogin();
	}

	componentDidMount() {
		fetch(API)
			.then((body) => body.json())
			.then((body) => {
				var arr = body.map((item) => item);
				this.setState({ ...this.state, usersData: arr });
			})
			.catch((err) => console.log(err));
	}

	checkingPasswordAndLogin() {
		this.state.usersData.map((item, index) => {
			if (this.state.password === item.password && this.state.email === item.email) {
				return this.props.history.push({
					pathname: '/organ',
					data: this.state.email
				});
			}
		});
	}

	render() {
		return (
			<div className="signup__page">
				<form id="form_wrapper" onSubmit={this.handleSubmit}>
					<div id="form_left">
						<img
							src="https://media1.tenor.com/images/f3300b1ad8320c61263cbd37e1072a7c/tenor.gif?itemid=15501310"
							alt="qr icon"
						/>
					</div>
					<div id="form_right">
						<h1>Введите свои данные</h1>
						<div class="input_container">
							<i class="fas fa-envelope" />
							<input
								placeholder="E-mail адрес"
								type="email"
								name="email"
								id="field_email"
								class="input_field"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</div>
						<div class="input_container">
							<i class="fas fa-lock" />
							<input
								placeholder="Пароль"
								type="password"
								name="password"
								id="field_password"
								class="input_field"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>
						<input
							type="submit"
							value="Войти"
							id="input_submit"
							class="input_field"
							onClick={() => this.props.checkingPasswordAndLogin}
						/>
						{/* <span>
							Забыли <a href="#"> Логин / Пароль ?</a>
						</span> */}
					</div>
				</form>
			</div>
		);
	}
}

export default SignInForm;
