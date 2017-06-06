import React, {Component} from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import Search from './Search';

class Detail extends Component {
    render() {
        const matchId = this.props.match.params.postTimestamp;
        const posts = this.props.receiveItems.items;
        var detailArray = posts.filter(function(item) {
            return item && item.timestamp == matchId;
        })
        function getLocalTime(nS) {
            return new Date(parseInt(nS, 10)).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }
        return (
            <div className="common_page">

                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>

                        <div className="col-md-8 detail_article">
                            <Search {...this.props}/>
                          
                            {detailArray.length == 0
                                ? <h1>Loading...</h1>
                                : detailArray.map((post, i) => <div key={i}>

                                    <div className="detail_article_img">
                                        <img src={post.imgUrl}/>
                                    </div>
                                    <div className="detail_article_title">{post.title}</div>
                                    <div className="new_list_auda">
                                        <span className="new_list_author">{post.author}</span>
                                        <span className="new_list_date">{getLocalTime(post.timestamp)}</span>
                                    </div>
                                    <hr/>
                                    <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(post.text)))} readOnly/>
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

export default Detail
