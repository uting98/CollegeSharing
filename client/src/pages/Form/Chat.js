import React, { Component } from "react"
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import cookie from "react-cookies";
import { firebase } from "../../firebase"

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        username: cookie.load("username"),
        text: "", 
        messages: [] 
    }
  }
  componentDidMount() {    
    this.getMessages()
  }

  onSubmit = event => {
    if (event.charCode === 13 && this.state.text.trim() !== "") {
        console.log(this.state.text)
      this.writeMessageToDB([this.state.username, this.state.text])
      this.setState({ text: "" })
    }
  }

  writeMessageToDB = message => {
    firebase
      .database()
      .ref("messages/")
      .push({
        text: message
      })

      firebase
      .database()
      .ref("messages2/")
      .push({
        text: message
      })
  }

  getMessages = () => {
    var messagesDB = firebase
      .database()
      .ref("messages/")
      .limitToLast(500)
    messagesDB.on("value", snapshot => {
      let newMessages = []
      snapshot.forEach(child => {
        var message = child.val()
        newMessages.push({ id: child.key, text: message.text })
      })
      this.setState({ messages: newMessages })
      this.bottomSpan.scrollIntoView({ behavior: "smooth" })
    })
  }

  renderMessages = () => {
    return this.state.messages.map(message => (
      <ListItem key={message.id}>
        {console.log(message)}
        <ListItemText
          style={{ wordBreak: "break-word" }}
          primary={message.text}
        />
      </ListItem>
    ))
  }

  render() {
    return (
      <div className="App">
        <List>{this.renderMessages()}</List>
        <TextField
          autoFocus={true}
          multiline={true}
          rowsMax={3}
          placeholder="Type something.."
          onChange={event => this.setState({ text: event.target.value })}
          value={this.state.text}
          onKeyPress={this.onSubmit}
          style={{ width: "98vw", overflow: "hidden" }}
        />
        <span ref={el => (this.bottomSpan = el)} />
      </div>
    )
  }
}

export default Chat