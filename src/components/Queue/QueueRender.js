import React from 'react';
import './QueueRender.css';

const API_EMPLOYEE = "https://qr-queue-project.herokuapp.com/api/employee/all";

class QueueRender extends React.Component {
	state = {
        token: "",
        queueId: null,
        queueNum: 0
	};

	componentWillMount() {
        let queueId = localStorage.getItem('queueId');
        this.setState({queueId: queueId})
        let token = localStorage.getItem('token');
        this.setState({token: token})
    }
    
	renderQueue = () => {
        console.log(this.props)
				if ((this.props.user.ipAddress != this.state.token) && (this.state.queueId == this.props.user.queueId)) {
                    // this.setState({...this.state, queueNum: 1}) 
				    return  (
                        <div className="queue__render">
                            <div className="queue"> 
                                <div className="queue__person-logo"><img src="https://cdn0.iconfinder.com/data/icons/users-16/16/person_simple-512.png"></img></div>
                                <div className="queue__checker">
                                    <h3>Посетитель в очереди<span className="queue__number"> №{this.props.num + 1}</span></h3> 
                                    {/* <h3>Персональный ID №{this.props.user.id}</h3> */}
                                    <h3>Зарегистрирован в {this.props.user.currentTime}</h3>
                                </div>
                            </div>
                        </div>
                    )   
                } 
                if ((this.props.user.ipAddress == this.state.token) && (this.state.queueId == this.props.user.queueId)){
                    return  (
                        <div className="queue__render">
                            <div className="queue2"> 
                                <div className="queue__person-logo"><img src="data:image/jpeg;base64,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"></img></div>
                                <div className="queue__checker">
                                    <h3>Вы<span className="queue__number"> №{this.props.num + 1} в очереди</span></h3>
                                    {/* <h3>Ваш персональный ID №{this.props.user.id}</h3> */}
                                    <h3>Зарегистрированы в {this.props.user.currentTime}</h3>
                                </div>
                            </div>
                        </div>   
                    )
                }
                // this.setState({...this.state, queueNum: 1}) 

    };
    

	render() {
		return (
			<div className="container">
				<div className="queues">{this.renderQueue()}</div>
			</div>
		);
	}
}

export default QueueRender;
