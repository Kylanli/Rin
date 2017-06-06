import React, {Component} from 'react';
import DraftEditor from './DraftEditor';
import Register from './LoginRegister/Register'

export default class Post extends Component{
  componentWillMount() {
      window.scrollTo(0, 0);
  }
  render(){
    const userInfo = this.props.userInfo
    return(
      <div className="common_page"><div className="container"><div className="row"><div className="col-md-2"></div>

                 <div className="col-md-8">
                   {
                     userInfo.isLoggedIn
                     ?
                     <DraftEditor userInfo={userInfo}/>
                     :
                     <div>
                        <h3 className="Login_title">注册即可发表文章</h3>
                        <Register{...this.props}/>
                     </div>
                   }
                  </div>

      <div className="col-md-2"></div></div></div></div>
    )
  }
}
