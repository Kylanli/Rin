import React, {Component} from 'react'
import { HashRouter,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchPostsIfNeeded} from './actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from './components/Navigation.js'
import Home from './components/Home'
import Post from './components/Post'
import LoginIndex from './components/LoginRegister/LoginIndex';
import RegisterIndex from './components/LoginRegister/RegisterIndex';
import Detail from './components/Detail'
import SearchList from './components/SearchList'
import Foot from './components/Foot'
import Latest from './components/ArticleList/Latest'
import Popular from './components/ArticleList/Popular'


class Root extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchPostsIfNeeded())
    }
    render() {
        return (
          <MuiThemeProvider>
            <HashRouter history={history}>
                <div>
                    <Navigation {...this.props}/>
                    <Route exact path="/" render={(props) => (<Home {...this.props} {...props}/>)}/>
                    <Route path="/post" render={(props) => (<Post {...this.props} {...props}/>)}/>
                    <Route path="/login" render={(props) => (<LoginIndex {...this.props} {...props}/>)}/>
                    <Route path="/register" render={(props) => (<RegisterIndex {...this.props} {...props}/>)}/>
                    <Route path="/detail/:postTimestamp" render={(props) => (<Detail {...this.props} {...props}/>)}/>
                    <Route path="/latest" render={(props) => (<Latest {...this.props} {...props}/>)}/>
                    <Route path="/popular" render={(props) => (<Popular {...this.props} {...props}/>)}/>
                    <Route path="/searchlist/:searchvalue" render={(props) => (<SearchList {...this.props} {...props}/>)}/>
                    <Foot/>
                </div>
            </HashRouter>
          </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    const {receiveItems, userInfo} = state
    return {receiveItems, userInfo}
}

export default connect(mapStateToProps)(Root)
