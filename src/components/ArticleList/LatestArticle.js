import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class LatestArticle extends Component {
    render() {
        let posts = this.props.latPosts
        function compare(property){
          return function(a,b){
            var value1 =a[property];
            var value2 =b[property];
            return value2 - value1;
          }
        }
        let latestPosts = posts.sort(compare('timestamp'));
        function getLocalTime(nS) {
           return new Date(parseInt(nS ,10)).toLocaleString().replace(/:\d{1,2}$/,' ');
        }
        return (
            <div>
              {
                latestPosts.length == 0
                ?
                <h1>Loading...</h1>
                :
                latestPosts.slice(0,5).map((post,i) =>
                  <div key={i} className="new_list">
                    <div><span className="new_list_author">{post.author}</span> <span className="new_list_date">{getLocalTime(post.timestamp)}</span></div>
                    <div className="new_list_title" >{post.title}</div>
                      <Link to={{
                        pathname: `/detail/${post.timestamp}`
                      }} target="_blank">Read the full text</Link>
                  </div>
                )
              }
            </div>
        )
    }
}
