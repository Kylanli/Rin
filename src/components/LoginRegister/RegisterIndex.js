import React, {Component} from 'react';
import Register from './Register'

export default class RegisterIndex extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div className="common_page">
                <div className="container">
                    <h3 className="Login_title">Create Account</h3>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <Register {...this.props}/>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}
