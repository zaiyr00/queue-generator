import React from 'react';
import "./Queue.css"

class QueueNameRender extends React.Component {
    state = {
        queueId: null
    }

    componentWillMount(){
        let queueId = localStorage.getItem('queueId');
        this.setState({queueId: queueId})
    }

    nameQueue = () => {
        if (this.props.employee.queueId == this.state.queueId) {
            return (
                <h2>Ваша очередь к {this.props.employee.username}у отмечена зеленым цветом.</h2>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    }

    render() {
        return(
            this.nameQueue()
        )
    }

}

export default QueueNameRender;