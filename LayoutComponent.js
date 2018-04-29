import React, {Component} from 'react';

class Layout extends Component{
    render(){
      return(
        <div style={{marginTop:'10px'}}>
            <hr/>
                {this.props.children}
            <hr/>
        </div>
      );
    }
}

export default Layout;
