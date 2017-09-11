import React, { Component } from 'react';
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
    class: "font5"
  },
  {
    text: "--- or ---",
    class: "font1"
  },
  {
    text: "Read the Documentation.",
    class: "font4"
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "odtr",
      nodes: CONST_NODE
    };
  }

  getNodes(){
    //Empty texts array
    let texts = []
 
    //insert to text array
    this.state.nodes.forEach((element) => {
      texts.push( 
          <div className={"Texts " + element.class}>
            <span>
              {element.text}
            </span>
          </div> 
        );
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
      </div> 
    );
  }
}

export default App;