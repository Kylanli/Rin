import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Search from '../Search';

export default class Latest extends Component {
    componentWillMount(){
      window.scrollTo(0,0);
    }
    render() {
        const {receiveItems} = this.props
        let posts = receiveItems.items;
        function compare(property){
          return function(a,b){
            var value1 =a[property];
            var value2 =b[property];
            return value1 - value2;
          }
        }
        let popularPosts = posts.sort(compare('timestamp'));
        function getLocalTime(nS) {
           return new Date(parseInt(nS ,10)).toLocaleString().replace(/:\d{1,2}$/,' ');
        }
        return (
          <div className="common_page"><div className="container"><div className="row"><div className="col-md-2"></div>
              <div className="col-md-8">
                    <Link
                      to={{pathname: `/`}}
                      className="list_back_index"
                    ><i className="iconfont icon-xiangzuojiantou"></i> 返回首页</Link>
                    <Search {...this.props}/>

                    {
                      popularPosts.length == 0
                      ?
                      <h1>Loading...</h1>
                      :
                      popularPosts.slice(0, 20).map((post, i) => <div key={i} className="new_list">
                        <div>
                            <span className="new_list_author">{post.author}</span>
                            <span className="new_list_date">{getLocalTime(post.timestamp)}</span>
                        </div>
                        <div className="new_list_title">{post.title}</div>
                        <Link to={{
                            pathname: `/detail/${post.timestamp}`
                        }} target="_blank">Read the full text</Link>
                    </div>)
                  }
            </div>
      <div className="col-md-2"></div></div></div></div>
        );
    }
}
