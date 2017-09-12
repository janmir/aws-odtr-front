import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // ES6
import './App.css';

const CONST_NODE = [
  {
    text: "Oh Hello there stranger.",
    class: "font1"
  },
  {
    text: "Asking what to do here?",
    class: "font1"
  },
  {
    text: "Well ummm, you can...",
    class: "font1"
  },
  {
    text: "Try the API Wizard.",
    class: "font5",
    onclick: true
  },
  {
    text: "--- or ---",
    class: "font1"
  },
  {
    text: "Read the Documentation.",
    class: "font4",
    onclick: true
  },
  {
    text: "--- or ---",
    class: "font1"
  },
  {
    text: "Maybe some disclaimer?",
    class: "font1"
  }
];

class Link extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<span></span>);
  }

}

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className = "Footer">
      by jp with &lt;3
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
      <div className={"Texts " + element.class}>
        {onClickNode}
      </div>;
      texts.push(node);
    });
  
    return texts;
  }

  render() {
    return (
      <div className="Parent">
        <div className="Logo">
          {this.state.title}
        </div>
        {this.getNodes()}
        <Footer/>
      </div> 
    );
  }
}

export default App;