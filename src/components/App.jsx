import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Profile from './github/Profile.jsx';
import Search from "./github/Search.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'asitaru',
            userData: [],
            userRepos: [],
            perPage: 5 //Github changed the api, needs to be updated, all the repos are being returned right now
        };

    }

    getUserData() {
        $.ajax({
            url: 'https://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({userData: data});
            }.bind(this),
            error: function (xhr, status, error) {
                alert(error);
                this.setState({username: null})
            }.bind(this)
        })
    }

    getUserRepos() {
        $.ajax({
            url: 'https://api.github.com/users/' + this.state.username + '/repos?per_page=' + this.state.perPage + 'client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret + '&sort=created',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({userRepos: data});
            }.bind(this),
            error: function (xhr, status, error) {
                alert(error);
                this.setState({username: null})
            }.bind(this)
        })
    }

    handleFormSubmit(username) {
        this.setState({username: username}, function () {
            this.getUserData();
            this.getUserRepos();
        });
    }

    componentDidMount() {
        this.getUserData();
        this.getUserRepos();
    }

    render () {
        return (
            <div>
                <Search onFormSubmit = {this.handleFormSubmit.bind(this)}/>
                <Profile {...this.state} />
            </div>
        );
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};
App.defaultProps = {
    clientId: '44dca7493d13df5be469',
    clientSecret: 'b8b3abee0ff93c7d6a830c8544d71eb5ce3cec50'
};

export default App;