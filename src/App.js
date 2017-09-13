import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // ES6
import './AppSass.css';
import heart from './heart.svg';

const ISVG = require('react-inlinesvg');

const CONST_NODE = [
  {
    text: "Oh Hello there stranger."
  },
  {
    text: "Asking what to do here?"
  },
  {
    text: "Well ummm, you can..."
  },
  {
    text: "Try the API Wizard.",
    link: true
  },
  {
    text: "--- or ---"
  },
  {
    text: "Read Documentation?",
    link: true
  },
  {
    text: "--- or ---"
  },
  {
    text: "Maybe some disclaimer?"
  }
];

/*******Node********/
class Node extends Component {
  render() {
    var counter = 0;
    var list = this.props.data.map((element) => {
      console.log(counter);
      return element.link ? 
        <Link text={element.text} onClickListener={()=>{console.log(counter)}} key={counter++}/> :
        <div className="text" key={counter++}>{element.text}</div>;
    });

    return <div>{list}</div>;
  }

}

/*******Link********/
class Link extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activate: false
    }
  }

  render() {
    return (
      <div 
        className="link">
        <span onClick={this.props.onClickListener}>
          {this.props.text}
        </span>
      </div>
    );
  }

}

/*******Logo********/
class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "odtr"
    };
  }

  render() {
    return (
      <div className="logo">
        {this.state.title}
      </div>
    );
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
    
    this.state = {
      title: "odtr",
      nodes: CONST_NODE,
      open: false
    };
  }

  handleClick(){
    this.setState({
      open: true     
    });
  }

  handleHoverOff(){
    this.setState({
      open: false    
    });
  }

  componentWillMount(){
    // Calling setState here does not cause a re-render
    console.info('In Component Will Mount');
  }

  getNodes(){
    //Empty texts array
    let texts = []
 
    //insert to text array
    this.state.nodes.forEach((element) => {
      let style = this.state.open ? 100 : 20;
      
      var onClickNode = <span>{element.text}</span>;
      
      if(element.onclick){
        onClickNode = 
        <span 
          onMouseLeave={this.handleHoverOff}
          onClick={this.handleClick} 
          className="Link" 
          >
          {element.text}
          <div style={{ width: `${style}%`}}/>
        </span>;
      }

      let node = 
      <div className={"text " + element.class}>
        {onClickNode}
      </div>;
      texts.push(node);
    });
  
    return texts;
  }

  render() {
    return (
      <div className="appParent">
        <Logo/>
        <Node data={this.state.nodes}/>
        <div className = "footer">
          by jp with
          <ISVG src={heart}></ISVG>
        </div>
      </div> 
    );
  }
}

export default App;