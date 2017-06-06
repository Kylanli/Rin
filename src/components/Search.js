import React, {Component} from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    handleSearch = (event) => {
        this.setState({searchValue: event.target.value});
        event.preventDefault();
    }

    searchInput = (event) => {
        let push = this.props.history.push;
        push( `/searchlist/${this.state.searchValue}`)
        event.preventDefault();
    }
    render() {
        return (
            <div className="search_input_container">
                <input type="text" className="search_input" placeholder="搜索" value={this.state.searchValue} onChange={this.handleSearch}/>
                <i className="search_button icon-search2 iconfont" onClick={this.searchInput}></i>
            </div>
        )
    }
}
