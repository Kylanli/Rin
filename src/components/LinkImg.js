import React, {Component} from 'react';
export default class LinkImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailShow: 'none'
        }
    }
    handleMouseOver = () => {
        this.setState({detailShow: 'block'})
    }
    handleMouseLeave = () => {
        this.setState({detailShow: 'none'})
    }
    render() {
        const imageUrl = require(`../img/${this.props.imageName}.jpg`)
        return (
            <div>
                <div className="home_bot_imgs">
                    <a href={this.props.linkHref} target="_blank"
                       onMouseOver={this.handleMouseOver}
                       onMouseLeave={this.handleMouseLeave}
                       className="link_img"
                       style={{
                          backgroundImage: `url(${imageUrl})`,
                    }}>
                        <div className="link_img_text" style={{
                            display: this.state.detailShow
                        }}>
                            <p>查看{this.props.imageName}官网</p>
                        </div>

                    </a>
                </div>
            </div>
        )
    }
}
