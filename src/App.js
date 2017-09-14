import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // ES6
import './AppSass.css';
import heart from './heart.svg';
const ISVG = require('react-inlinesvg');

/*******The Data itself********/
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
    text: "Maybe some <span class='u'>disclaimer</span>?"
  }
];

/*******Node********/
class Node extends Component {
  constructor(props) {
    super(props);

    //bindings
    this.childOnClickListener = this.childOnClickListener.bind(this);
  }

  childOnClickListener(event, target){
    //Call parent onClick call back to remove logo
    this.props.onClickListener(event, target);

    //remove top margin
  }

  render() {
    var counter = 0;
    var lCounter = 0;
    var list = this.props.data.map((element) => {
      return element.link ? 
        <Link text={element.text} onClickListener={this.childOnClickListener} id={lCounter++} key={counter++}/> :
        <div className="text" key={counter++} dangerouslySetInnerHTML={{ __html: element.text }}/>;
    });

    return <div>{list}</div>;
  }

}

/*******Link********/
class Link extends Component {
  constructor(props) {
    super(props);

    //bindings
    this.onClickListener = this.onClickListener.bind(this);

    this.state = {
      activate: false
    }
  }

  onClickListener(event){
    this.props.onClickListener(event, this);
    this.setState({activate: !this.state.activate});
  }

  render() {
    return (
      <div 
        className="link">
        <span 
          onClick={this.onClickListener} 
          className={this.state.activate ? 'highlight': ''}>
            {this.props.text}
        </span>
        <div
          className={this.state.activate ? 'activate': ''}/>
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

  componentWillReceiveProps(property){
    console.log(ReactDOM.findDOMNode(this));

    switch(property.hide){
      case 0:{
        console.log("Will show the component!");
      }break;
      case 1:{
        console.log("Will hide the component!");
      }break;
      default:break;
    }
  }

  render() {
    return (
      <div className={`logo ${this.props.hide  ? 'logoHide':''}`}>
        {this.state.title}
      </div>
    );
  }

}

/*******Main App********/
class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    
    this.state = {
      title: "odtr",
      nodes: CONST_NODE,
      open: [false, false]
    };
  }

  handleClick(event, target){
    let id = target.props.id;
    let rev = !this.state.open[id];
    let temp = this.state.open;

    temp[id] = rev;

    this.setState({open: temp});
  }

  componentWillMount(){
    // Calling setState here does not cause a re-render
    console.info('In Component Will Mount');
  }

  render() {
    return (
      <div className="appParent">
        <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
          <Logo 
            hide = {this.state.open[0] | this.state.open[1]}/>
          <Node 
            onClickListener={this.handleClick} 
            data={this.state.nodes}/>
        </ReactCSSTransitionGroup>
        <div className = "footer">
          by jp with
          <ISVG src={heart}></ISVG>
        </div>
      </div> 
    );
  }
}

export default App;