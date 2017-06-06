import React, {Component} from 'react';
import PopularArticle from './ArticleList/PopularArticle';
import LatestArticle from './ArticleList/LatestArticle';
import Carousel from './carousel/Carousel';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Login from './LoginRegister/Login'
import Search from './Search';
import LinkImg from './LinkImg'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'a'
        };
    }
    componentWillMount() {
        window.scrollTo(0, 0);
    }

    handleChange = (value) => {
        this.setState({value: value});
    };

    render() {

        const {receiveItems, userInfo} = this.props
        const push = this.props.history.push
        return (
            <div className="common_page">
                <div className="container">
                    {userInfo.isLoggedIn
                        ? <div className="row">
                                <div className="col-sm-12">
                                    <Carousel push={push}/>
                                </div>
                            </div>
                        : <div className="row">
                            <div className="col-sm-9">
                                <Carousel push={push}/>
                            </div>

                            <div className="col-sm-3 hide768 ">
                                <div className="login_prompt">
                                    <div className="login_prompt_title">登录即可发表文章</div>
                                    <Login {...this.props}/>
                                </div>

                            </div>
                        </div>
                      }

                    <div className="row home_main">
                        <Search {...this.props}/>
                        <div className="col-md-7">
                            <Tabs value={this.state.value} onChange={this.handleChange} inkBarStyle={{
                                background: '#1E88E5'
                            }} tabItemContainerStyle={{
                                background: '#FF5722'
                            }}>
                                <Tab label="热门文章" value="a">
                                    <div>
                                        <PopularArticle popPosts={receiveItems.items}/>
                                        <RaisedButton label="查看更多热门文章" labelColor="#f5fdca" backgroundColor='#165857' fullWidth={true} onClick={e => {
                                            push('/popular')
                                        }}/>
                                    </div>
                                </Tab>
                                <Tab label="最新动态" value="b" onActive={this.handleActive}>
                                    <div>
                                        <LatestArticle latPosts={receiveItems.items}/>
                                        <RaisedButton label="查看更多最新动态" labelColor="#f5fdca" backgroundColor='#165857' fullWidth={true} onClick={e => {
                                            push('/latest')
                                        }}/>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                        <div className="col-md-5">
                            <LinkImg imageName="react" linkHref = "https://facebook.github.io/react/"/>
                            <LinkImg imageName="redux" linkHref = "http://redux.js.org"/>
                            <LinkImg imageName="reactrouter" linkHref = "https://reacttraining.com/react-router/"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
