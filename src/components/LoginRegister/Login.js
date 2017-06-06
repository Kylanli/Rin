import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {loggingIn} from '../../actions'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        }
    }

    handleUser = (event) => {
        this.setState({user: event.target.value});
    }
    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }

    LogInSubmit = (event) => {
        const {dispatch} = this.props
        const push = this.props.history.push
        dispatch(loggingIn(this.state.user, this.state.password, push))
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <TextField
                  hintText="Email"
                  fullWidth={true}
                  value={this.state.user}
                  onChange={this.handleUser}/>
                <br/>
                <TextField hintText="Password" fullWidth={true} type="password" value={this.state.password} onChange={this.handlePassword}/>
                <RaisedButton
                  labelColor="#f5fdca"
                  backgroundColor='#165857'
                  label="Sign in"
                  fullWidth={true}
                  onClick={this.LogInSubmit}/>
                <div className="LoginToRegister">还没有账户？<Link to="/register">点我注册</Link>
                </div>
            </div>
        )
    }
}
