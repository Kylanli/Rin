import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class PopularArticle extends Component {
    truncate = (str, num) => {
        if (str.length > num && num > 3) {
            return str.slice(0, (num - 3)) + "...";
        } else if (str.length > num && num <= 3) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }
    render() {
        let posts = this.props.popPosts
        function compare(property) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }
        let popularPosts = posts.sort(compare('timestamp'));

        function getLocalTime(nS) {
            return new Date(parseInt(nS, 10)).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }

        return (
            <div>
                {popularPosts.length == 0
                    ? <h1>Loading...</h1>
                    : popularPosts.slice(0, 5).map((post, i) => <div key={i} className="new_list">
                        <div>
                            <span className="new_list_author">{post.author}</span>
                            <span className="new_list_date">{getLocalTime(post.timestamp)}</span>
                        </div>
                        <div className="new_list_title">{this.truncate(post.title, 30)}</div>
                        <Link to={{
                            pathname: `/detail/${post.timestamp}`
                        }} target="_blank">Read the full text</Link>
                    </div>)
                  }
            </div>
        )
    }
}
