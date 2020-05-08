import React from 'react';
import './Organ.css'
import '../Queue/Queue.css'
import OrganRender from "./OrganRender"

const API_CLIENT = "https://qr-queue-project.herokuapp.com/api/client/all/";
const API_EMPLOYEE = "https://qr-queue-project.herokuapp.com/api/employee/all/"
const API = "https://qr-queue-project.herokuapp.com/api/client/";

class Organ extends React.Component {
  
	state = {
    clientData: [],
    employeeData: [],
    login: '',
	}	

	updateState = () => {
		fetch(API_CLIENT)
		   .then(response => response.json())
		   .then(result => {
			   var arr = result.map(item => item)
			   this.setState({...this.state, clientData: arr})
		   })
		   .catch(err => console.log(err));
   }

	componentDidMount = () => {
    this.updateState();  
    let email = localStorage.getItem('email');
    this.setState({login: email})

    fetch(API_EMPLOYEE)
		   .then(response => response.json())
		   .then(result => {
			   this.setState({...this.state, employeeData: result})
		   })
		   .catch(err => console.log(err));

	}

	deleteItem = (index) => {
    let dataItem = this.state.clientData;

        fetch(`${API}${dataItem[index].id}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'DELETE',
            body: JSON.stringify({data: dataItem})
            }).then(res=>res.json())
            .then(res => console.log(res));

        dataItem.splice(index, 1); 
        this.setState([dataItem]);
    }

    inServiceItem = (index) => {
      let dataItem = this.state.clientData;
      if(dataItem[index].inService) dataItem[index].inService = false;
      else dataItem[index].inService = true;
      this.setState([dataItem])

      fetch(`${API}${dataItem[index].id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({inService: dataItem[index].inService})
      })
        .then((res) => res.json())
    }

    userName = () => {
      for(let i = 0; i < this.state.employeeData.length; i++){
        if (this.state.employeeData[i].email == this.state.login){
          return(
              <h2>Здравствуйте, {this.state.employeeData[i].username}!</h2>
          )
        }
      }
    }

    userChecker = () => {
      if(this.state.login === undefined) {
        return (
          <>
          <h1>Пожалуйста, перезайдите!</h1>
          <button onClick={ () => this.props.history.push('/signin_form') }>Ок</button>
          </>
        )
      } if(this.state.login !== '') {
        return (
          this.state.clientData.map((item, index) => {
            return (						
              <OrganRender
                key={index}
                user={item}	
                deleteItemFunc={() => this.deleteItem(index)}
                inServiceItemFunc={() => this.inServiceItem(index)}
              />)})
        )
      }
    }


	render() {
		return (
			<>
      <body>
    <header role="banner">
      <h1>Админская панель</h1>
      <ul class="utilities">
        <br></br>
          <li class="users"><a href="#">{this.state.login}</a></li>
        <li class="logout warn"><a href="" onClick={ 
          () => this.props.history.push('/', localStorage.removeItem('email'))
          
          }>Выйти</a></li>
      </ul>
    </header>

    <nav role='navigation'>
      <ul class="main">
        <li class="dashboard"><a href="">Панель управления</a></li>
      </ul>
    </nav>

    <main role="main">
      
      <section class="panel important">
      {this.userName()}
        <ul>
          <li>Ваша информационная панель</li>
        </ul>
      </section>
      
      <section class="panel important">
      <main class="main">
      <div className="title__queue">
        {this.userChecker()}
      </div>
      </main>
      </section>

    </main>
    </body>

				
			</>
		);
  	};
};

export default (Organ);

