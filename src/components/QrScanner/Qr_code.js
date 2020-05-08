import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';
import './Qr_code.css';

const API_CLIENT = "https://qr-queue-project.herokuapp.com/api/client/";

let rand = function() {
	return Math.random().toString(36).substr(2); // remove `0`
};

let token = function() {
	return rand() + rand(); // to make it longer
};

token();

class Qr_code extends Component {
	constructor(props){
		super(props)
		this.state = {
			data: [],
			token: token(),
			queueID: '',
			delay: 500,
			result: 'No result',
			previewStyle: {
				height: 240,
				width: 320
			},
			currentDate:
				new Date().getHours() +
				':' +
				(new Date().getMinutes() < 10 ? '0' + 
				new Date().getMinutes() : '' 
				+ new Date().getMinutes())
		};
		this.handleScan = this.handleScan.bind(this)
	}

	handleScan = (data) => {
		this.setState({
			result: data
		});
	};

	handleScan = (result) => {

		for (let i = 0; i < 1000; i++) {
			if (result === `QR_QUEUE_NUMBER=${i}`) {
				localStorage.setItem('queueId', JSON.stringify(i));
				fetch(`https://qr-queue-project.herokuapp.com/api/queue/${i}`)
				.then(body => body.json())
				.then(body =>  {
					console.log(body)
					this.setState({...this.state, queueID: body.id, name: body.name})
				})
				.then((responseJson) => {
					this.addUser(responseJson);
				})
				.catch(err => console.log(err))

			}

		}
	};

	handleError = (err) => {
		console.error(err);
	};

	openImageDialog() {
        this.refs.qrReader1.openImageDialog()
	}

	componentWillMount() {
		localStorage.setItem('token', this.state.token);
	}
	
	addUser = () => {
		let arr = this.state.data;
		arr.push({ currentDate: this.state.currentDate });
		this.setState({ ...this.state, data: arr });

		let payload = {
			"ipAddress": this.state.token,
			"currentTime": this.state.currentDate,
			"queueId": this.state.queueID,
		}

		fetch(API_CLIENT, {
			method: 'post',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then((res) => res.json())
			.then(() => this.props.history.push('/queue'));
	};
 
	render() {
		return (
			<>
			<div className="section">
				<div className="section_qr">
					<p className="section__txt">Нажмите на кнопку, чтобы отсканировать QR-код</p>
					<div className="section__qr_reader">
						<QrReader ref='qrReader1'
							delay={this.state.delay}
							style={this.state.previewStyle}
							onError={this.handleError}
							onScan={this.handleScan}
							legacyMode={true}
						/>
					</div>
				</div>
				<div className="btn"><input className="button" type="button" value="Нажмите здесь" onClick={this.openImageDialog.bind(this)} /></div>
			</div>
			</>
		);
	}
}

export default Qr_code;