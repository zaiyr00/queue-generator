import React from "react";
import QueueRender from "./QueueRender"
import QueueNameRender from './QueueNameRender'
import "./Queue.css"

const API_CLIENT = "https://qr-queue-project.herokuapp.com/api/client/all";
const API_EMPLOYEE = "https://qr-queue-project.herokuapp.com/api/employee/all";

class Queue extends React.Component {

    state = {
        clientsData: [],
        employeesData: [],
        queueId: "",
    }

    componentDidMount() {
        this.getEmployee();
        let queueId = localStorage.getItem('queueId');
        this.setState({queueId: queueId})

        fetch(API_CLIENT)
            .then(body => body.json())
            .then(body =>  {
                let arr = body.map(item => item)
                this.setState({...this.state, clientsData: arr})
            })
            .catch(err => console.log(err))  
    }

    getEmployee() {
        fetch(API_EMPLOYEE)
            .then(body => body.json())
            .then(body =>  {
                let arr = body.map(item => item)
                this.setState({...this.state, employeesData: arr})
            })
            .catch(err => console.log(err))  
    }

    queueName = () => {
                return(
                    <h2>Ваша очередь к {this.state.employeesData.username} отмечена зеленым цветом.</h2>
                )
    }

    render() {       
        return (
            <React.Fragment>
            <div className="queue__list">
                    <div className="title__queue">
                        {
                            this.state.employeesData.map((item, index) => <QueueNameRender
                                key={index}
                                employee={item}
                            />)
                        }
                    </div>
                    <div className="queue__identify">
                        {
                            this.state.clientsData.map((item, index) => <QueueRender
                                key={index}
                                user={item}
                                num={index}
                            />)
                        }
                    </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Queue;