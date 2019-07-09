import React from 'react';
import axios from 'axios';
import User from '../users/user';
import '../../styles/base.scss';
import './header.scss';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            users: [],
            isFetching: false,
            response: {},
            repos: []
        };
    }

    onInputChange = (elem) => {
        this.setState({ searchTerm: elem.target.value });
        if (elem.key === 'Enter') {
            // console.log(`enter pressed`);
            this.fetchUsers();
        }  
    }
/* =================== SORTING LOGIC ================== */
    
compareValues = (key, order) => {    
    return function(a, b) {
      if (!a.hasOwnProperty.call(a, key) || !b.hasOwnProperty.call(b, key)) { 
          return 0; 
      }
      
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
        
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

sortData = (userData, ele) => {
        const criteria = ele.target.value;
        let sortedUser;
        switch (criteria) {
            case 'nameAsc':
                sortedUser = userData.sort(this.compareValues('login', 'asc'));                
                this.setState({ users: sortedUser });
                // userData.sort((a, b) => a.login - b.login);
            break;

            case 'nameDsc':
                sortedUser = userData.sort(this.compareValues('login', 'desc'));
                this.setState({ users: sortedUser });
            break;

            case 'rankAsc':
                sortedUser = userData.sort(this.compareValues('score', 'asc'));
                this.setState({ users: sortedUser });
            break;

            case 'rankDsc':
                sortedUser = userData.sort(this.compareValues('score', 'desc'));
                this.setState({ users: sortedUser });
            break;

            default:
                break;
        }
    };
/* ======================= SORTING LOGIC END ==================== */

/* ======================= DATA FETCHING LOGIC ================= */
fetchUsers = (e) => {
    const { searchTerm } = this.state;
        e.preventDefault();
        // console.log("Fetching data");        
        axios.get(`https://api.github.com/search/users?q=${searchTerm}`)
            .then((res) => {
                if (res.data) {
                    const response = res.data;
                    const users = res.data.items;
                    this.setState({ users, response, isFetching: false });
                }
            });
    }

fetchRepo = (uname) => {
    axios.get(`https://api.github.com/users/${uname}/repos`)
         .then((resp) => {
             if (resp.data) {
                 const repos = resp.data;
                 this.setState({ repos });                 
             }
         });
}
/* ======================= DATA FETCHING LOGIC ================= */

    render() {
        const { users } = this.state;
        const { response } = this.state;
        const { repos } = this.state;
        return (
            <React.Fragment>
                <div className="full-width">
                <div className="container-fluid bg-info">
                    <div className="row">
                            <form className="form-inline" onSubmit={e => this.fetchUsers(e)}>
                                <h5>Sort By:</h5>
                                <div className="form-group">
                                    <select name="sortBy" className="form-control" onChange={e => this.sortData(users, e)}>
                                        <option value="" />
                                        <option value="nameAsc">Name(A-Z)</option>
                                        <option value="nameDsc">Name(Z-A)</option>
                                        <option value="rankAsc">Rank &uarr;</option>
                                        <option value="rankDsc">Rank &darr;</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="searchBox" placeholder="Search" onChange={e => this.onInputChange(e)} />
                                    <button type="submit" className="btn btn-default" name="search">Search</button>
                                </div>
                            </form>
                    </div>
                </div>  
                {/* ====Total Count Display===== */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3">
                            <h6>{`Total Results:${response.total_count}`}</h6>
                            
                        </div>
                    </div>
                    <div className="row col-lg-8 col-sm-12 mx-auto">
                        {users.length > 0 && users.map(item => (
                            <User
                                key={item.id}
                                uniKey={item.id}
                                uname={item.login}
                                profile={item.url}
                                avatar={item.avatar_url}
                                fetchRepo={this.fetchRepo}
                                repoName={repos.full_name}
                                repoLang={repos.language}
                                repos={repos}
                                />
                        ))}
                    </div>
                    {this.sortedUser}
                </div>    
                </div>        
            </React.Fragment>
        );
    }
}
