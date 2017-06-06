import React, {Component} from 'react';
import {
    convertToRaw,
    Editor,
    EditorState,
    RichUtils,
} from 'draft-js';
import {Link} from 'react-router-dom'

import wilddog from 'wilddog';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class DraftEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: '',
            author: '',
            imgUrl: '',
            open: false
        };
        this.focus = () => this.refs.editor.focus();
        this.handleText = (editorState) => this.setState({editorState});

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    handleOpen = () => {this.setState({open: true});};
    handleClose = () => {this.setState({open: false});};

    _handleKeyCommand(command) {
        const {editorState} = this.state
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.handleText(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.handleText(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
    _toggleBlockType(blockType) {
        this.handleText(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
    _toggleInlineStyle(inlineStyle) {
        this.handleText(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle))
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value});
    }
    handleAuthor = (event) => {
        this.setState({author: event.target.value});
    }
    handleImgUrl = (event) => {
        this.setState({imgUrl: event.target.value});
    }

    handleSubmit = (event) => {
        let contentState = this.state.editorState.getCurrentContent();
        let myDate = new Date();
        let timestamp = myDate.getTime();

        var config = {
          syncURL: "https://rinterest.wilddogio.com",
          authDomain: "rinterest.wilddog.com"
        };
        wilddog.initializeApp(config);
        var refArticle = wilddog.sync().ref("/rinterest/article");
        var postsRef = refArticle.child("react");

        let uid = this.props.userInfo.user.uid
        let _this = this;
        if (this.state.title && this.state.author) {
            console.log(uid)
            postsRef.push({
                "title": this.state.title,
                "author": this.state.author,
                "imgUrl": this.state.imgUrl,
                "text": JSON.stringify(convertToRaw(contentState)),
                "userUid": uid,
                "timestamp": timestamp

            }, function(error) {
                if (error == null) {
                    _this.handleOpen()
                } else {
                    alert('貌似出错了')
                }
            });
        } else {
            alert('标题和作者不能为空~')
        }
        event.preventDefault();
    }

    render() {
      const actions = [
        <FlatButton
          label="再写一篇"
          primary={true}
          onTouchTap={this.handleClose}
        />,
        <Link to="/">
          <FlatButton
          label="返回首页"
          primary={true}
          />,
        </Link>
        ];

        const {editorState} = this.state;
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        return (
            <div>
              <div>
                <Dialog
                  title="success"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  数据提交成功
                </Dialog>
              </div>


              <TextField hintText="Please enter the title" fullWidth={true} value={this.state.title} onChange={this.handleTitle}/> <br/>
              <TextField hintText="Please enter your name" fullWidth={true} value={this.state.author} onChange={this.handleAuthor}/>
              <TextField hintText="Please enter the image url" fullWidth={true} value={this.state.imgUrl} onChange={this.handleImgUrl}/>

              <div className="RichEditor-root">
                  <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType}/>
                  <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
                  <div className={className} onClick={this.focus}>
                      <Editor blockStyleFn={getBlockStyle} customStyleMap={styleMap} editorState={editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.handleText} onTab={this.onTab} placeholder="Tell a story..." ref="editor" spellCheck={true}/>
                  </div>
              </div>
              <RaisedButton primary={true} label="Submit" fullWidth={true} onClick={this.handleSubmit}/>
            </div>
        );
    }
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {
        label: 'H1',
        style: 'header-one'
    }, {
        label: 'H2',
        style: 'header-two'
    }, {
        label: 'H3',
        style: 'header-three'
    }, {
        label: 'H4',
        style: 'header-four'
    }, {
        label: 'H5',
        style: 'header-five'
    }, {
        label: 'H6',
        style: 'header-six'
    }, {
        label: 'Blockquote',
        style: 'blockquote'
    }, {
        label: 'UL',
        style: 'unordered-list-item'
    }, {
        label: 'OL',
        style: 'ordered-list-item'
    }, {
        label: 'Code Block',
        style: 'code-block'
    }
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) => <StyleButton key={type.label} active={type.style === blockType} label={type.label} onToggle={props.onToggle} style={type.style}/>)}
        </div>
    );
};

var INLINE_STYLES = [
    {
        label: 'Bold',
        style: 'BOLD'
    }, {
        label: 'Italic',
        style: 'ITALIC'
    }, {
        label: 'Underline',
        style: 'UNDERLINE'
    }, {
        label: 'Monospace',
        style: 'CODE'
    }
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type => <StyleButton key={type.label} active={currentStyle.has(type.style)} label={type.label} onToggle={props.onToggle} style={type.style}/>)}
        </div>
    );
};
