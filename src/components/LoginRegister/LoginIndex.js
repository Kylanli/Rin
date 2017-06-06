import React, {Component} from 'react';
import Login from './Login'

export default class LoginIndex extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div className="common_page">
                <div className="container">
                    <h3 className="Login_title">Login</h3>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <Login {...this.props}/>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}
