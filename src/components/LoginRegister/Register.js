import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {registering} from '../../actions'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleUser = (event) => {
        this.setState({user: event.target.value});
    }
    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }
    handleConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value})
    }

    LogInSubmit = (event) => {
        if (this.state.password === this.state.confirmPassword) {
            const {dispatch} = this.props
            const push = this.props.history.push
            dispatch(registering(this.state.user, this.state.password, push))
        } else {
            alert("The password entered twice is inconsistent. Please re-enter it")
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <TextField hintText="Email" fullWidth={true} value={this.state.user} onChange={this.handleUser}/>
                <br/>
                <TextField
                    hintText="Password"
                    fullWidth={true}
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePassword}/>
                <TextField
                  hintText="Confirm"
                  fullWidth={true}
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.handleConfirmPassword}/>
                <RaisedButton primary={true} label="CREATE" fullWidth={true} onClick={this.LogInSubmit}/>
                <div className="LoginToRegister">
                    <span>已经有账号？</span>
                    <Link to="/login">直接登录</Link>
                </div>
            </div>
        );
    }
};
