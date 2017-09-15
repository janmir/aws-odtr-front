import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import './AppSass.css';
import heart from './heart.svg';
import { TweenLite } from 'gsap';

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
    text: "Fancy Documentation?",
    link: true
  },
  {
    text: "--- or ---"
  },
  {
    text: "Maybe some <span class='u'>disclaimer</span>?"
  }
];

/*******Wizard********/
class Wizard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<span>
    ✨Hello there 🎅🏼! <del>I'm Santa</del>, I'm the 🌠Wizard🌟! I can turn you into a 🦎 or 🐓 or help you out with the API. <br/>
    As matter of fact all you have to do is fill up the fields below and the url will "automagically" be generated for you. <br/>
    Amazing? I know right? Im a 🚀Wizard⚡ after all...Enjoy👏🏻 - Rock on🤘🏻 - Prosper..Whatever!🎏🗾🎎
    </span>);
  }
}

/*******Documentation********/
class Documentation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<span>
      All publicly accessible APIs are only available in REST - GET requests. <br/>
      Top-most domain: <i><u>https://api.janmir.me/aws-odtr-v2</u></i> <br/><br/>
      1️⃣ &nbsp;<b>/login</b> :Login to ODTR by supplying username and password.<br/>
      ▪ Params: username, password & email (optional)<br/>
      ▪ Response: result, verified, username, execution<br/>
      2️⃣ &nbsp;<b>/check</b> :Login and then checks ODTR details. <br/>
      ▪ Params: username, password & email (optional)<br/>
      ▪ Response: result, verified, username, execution, since, record, date<br/>
      3️⃣ &nbsp;<b>/biteme</b> :Login then perform timein/timeout.<br/>
      ▪ Params: username, password & email (optional)<br/>
      ▪ Response: result, verified, username, execution<br/>
    </span>);
  }
}

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

  getContents(target){
    if(target.props.id === 0){
      return <Wizard/>;
    }else{
      return <Documentation/>;
    }
  }

  render() {
    return (
      <div 
        className={`link ${this.state.activate ? 'stretch': ''}`}>
        <span 
          id='banner'
          onClick={this.onClickListener} 
          className={this.state.activate ? 'highlight': ''}>
            {this.props.text}
        </span>
        <div
          id='top'
          className={this.state.activate ? 'activate': ''}/>
        <div 
          id='bottom'
          className={this.state.activate ? 'activate': ''}>
          {this.getContents(this)}
        </div>
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
    /*TweenLite.to(ReactDOM.findDOMNode(this), 2, {width:"200px", height:"150px", 
      onComplete: () => {
        console.log("Will finish the component!");
      }
    });*/

    //ReactDOM.findDOMNode(this).addEventListener("transitionend", () => { alert('done'); }, true);

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
    console.log("Will render the component!");
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
      nodes: CONST_NODE,
      linkStates: [false, false],
      containerClass: '',
      open: false
    };
  }

  handleClick(event, target){
    //For animating the hover
    let id = target.props.id;
    let rev = !this.state.linkStates[id];
    let temp = this.state.linkStates;
    
    temp[id] = rev;
    let open = temp[0] | temp[1];
    
    //move margin
    let containerClass = (open) ? id === 0 ? 'first' : 'second' : '';

    //Set all states at once
    this.setState({
      linkStates: temp,
      containerClass: containerClass,
      open: open
    });
  }

  componentWillMount(){
    // Calling setState here does not cause a re-render
    console.info('In Component Will Mount');
  }

  render() {
    return (
      <div className="appParent">
        <div className = "header"/>
        <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
          <Logo 
            hide = {this.state.open}/>
          <div className={`nodeContainer ${this.state.containerClass}`}>
            <Node 
              onClickListener={this.handleClick} 
              data={this.state.nodes}/>
          </div>
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