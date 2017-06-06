import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchList extends Component {
    componentWillMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const searchValue = this.props.match.params.searchvalue;
        const posts = this.props.receiveItems.items;

        function serchFunction(item) {
            return item && item.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
        }

        var detailArray = posts.filter(serchFunction);

        function getLocalTime(nS) {
            return new Date(parseInt(nS, 10)).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }
        return (
            <div className="common_page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">

                            <Link to={{
                                pathname: `/`
                            }} className="list_back_index">
                                <i className="iconfont icon-xiangzuojiantou"></i>
                                返回首页</Link>

                            <h3 className="search_tip">
                                <span>您搜索的是:</span>{searchValue}</h3>
                            <h3 className="search_tip">
                                <span>搜索结果:</span>
                            </h3>

                            {detailArray.length == 0
                                ? <p>没有搜索到您输入的内容</p>
                                : detailArray.map((post, i) => <div key={i} className="new_list">
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

                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchList
