import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {signOut, authState} from '../actions'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import logo from '../img/logo.png'

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({
        open: !this.state.open
    });
    handleClose = () => this.setState({open: false});

    handleSignOut = (event) => {
        const {dispatch} = this.props
        dispatch(signOut())
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(authState())
    }

    render() {

        const {userInfo} = this.props
        return (
            <div className="navbar_main">
                <span onTouchTap={this.handleToggle}><i className="icon_list iconfont icon-xiangyou"></i> </span>
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                   <MenuItem onTouchTap={this.handleClose}><Link to="/" >首页</Link></MenuItem>
                   <MenuItem onTouchTap={this.handleClose}><Link to="/post">写一篇</Link></MenuItem>
                </Drawer>



                <Link className="nav_logo" to="/"><img src={logo} className="logo_img" alt="logo"/></Link>
                {userInfo.isLoggedIn
                    ? <div className="nav_link">
                            <NavLink className="nav_icon" to="/post" activeClassName='is-active'><i className="iconfont icon-wenzhang"></i><span className="nav_text"> Post</span></NavLink>
                            <NavLink className="nav_icon" to="/myarticle" activeClassName='is-active'><i className="iconfont icon-gerenzhongxin"></i><span className="nav_text"> 个人中心</span></NavLink>
                            <span onClick={this.handleSignOut} className="nav_icon"><i className="iconfont icon-icon"></i><span className="nav_text"> Sign out</span></span>
                        </div>
                    : <div className="nav_link">
                        <NavLink className="nav_icon" to="/login"  activeClassName='is-active'><i className="iconfont icon-login_user"></i><span className="nav_text"> Login</span></NavLink>
                        <NavLink className="nav_icon" to="/Register" activeClassName='is-active'><i className="iconfont icon-register"></i><span className="nav_text"> Register</span></NavLink>
                    </div>
                  }
            </div>
        )
    }
}
