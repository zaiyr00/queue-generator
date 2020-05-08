import React from "react";
import "./Organ.css";
import "../SignInForm/SignInForm.css"

const API_QUEUE = "https://qr-queue-project.herokuapp.com/api/queue/all"
const API_EMPLOYEE = "https://qr-queue-project.herokuapp.com/api/employee/all"

class OrganRender extends React.Component {
    state = {
        employeesData: [],
        queuesData: [],
        email: ""
    };
    
    componentWillMount() {
        let email = localStorage.getItem('email');
        this.setState({email: email})

        fetch(API_QUEUE)
            .then(body => body.json())
            .then(body =>  {
                var arr = body.map(item => item)
                this.setState({...this.state, queuesData: arr})
                // console.log(arr)
            })
            .catch(err => console.log(err)) 

        fetch(API_EMPLOYEE)
            .then(body => body.json())
            .then(body =>  {
                var arr = body.map(item => item)
                this.setState({...this.state, employeesData: arr})
            })
            .catch(err => console.log(err)) 
    }

    renderQueue = () => {
        for (let i = 0; i < this.state.employeesData.length; i++){
            if (this.state.employeesData[i].queueId == this.props.user.queueId && this.state.employeesData[i].email == this.state.email){
                return(
                    <div className="queue__render">   
                        <div className="queue3"> 
                            <div className="queue__person-logo"><img src="https://cdn0.iconfinder.com/data/icons/users-16/16/person_simple-512.png"></img></div>
                            <div className="queue__checker">
                                <h3>Посетитель: <span className="queue__number">№{this.props.user.id}</span></h3>
                                <h3>Зарегистрирован в {this.props.user.currentTime}</h3>
                            </div>
                            {/* <div className="mark__queue">
                                <input type="checkbox" class="switch_1" onClick={(e) => {this.props.inServiceItemFunc(e)}}></input>
                            </div> */}
                                <div class="close-container" onClick={(e) => { if (window.confirm('Вы уверены, что хотите удалить?')) this.props.deleteItemFunc(e)}}>
                                    <div class="leftright"></div>
                                    <div class="rightleft"></div>
                                    <label class="close">удалить</label>
                                </div>
                        </div>
                    </div>
                )
            } 
            // if (!(this.state.employeesData[i].queueId == null)) {
            //     return(
            //         <div>Вы не приписаны ни в одну очередь</div>
            //     )
            // }
        }
    }

    render() {
        return(
            <div className="container">
               {this.renderQueue()}
            </div>
        )
    }
}

export default OrganRender;