import React, { Component } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Grid,
  Container
} from "@material-ui/core";
import cookie from "react-cookies";
import { firebase } from "../../firebase";

class Chat extends Component {
  constructor(props) {
    const urls = window.location.href;
    const chatID = urls.slice(urls.lastIndexOf("/") + 1, urls.length);
    super(props);
    this.state = {
      username: cookie.load("username"),
      chatID: chatID,
      text: "",
      messages: [],
      chatData: [],
      clickedChatId: "",
      clickedFriendName: "",
    };
  }
  componentDidMount() {
    const header = cookie.load("token");
    const urls = window.location.href;
    const chatID = urls.slice(urls.lastIndexOf("/") + 1, urls.length);

    fetch("/api/chat", {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${header}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Chat Validation");
      })
      .then(data=> {
        this.setState({
          fetchChatSuccess: true,
          chatData: data
        });
        if (chatID != "chat") {
          this.state.chatData.filter(data => {
            if(chatID == data.chatID){
                this.setState({
                    clickedFriendName: data.friendName
                })
            }
          });
        }
      })
      .catch(err => {
        this.setState({
          fetchChatSuccess: false
        });
        console.log(err);
      });
    this.getMessages();
  }

  handleClick = async event => {
    await this.setState({
      clickedChatId: "chat" + event.chatID,
      clickedFriendName: event.friendName,
    });
    this.getMessages();
  };

  onSubmit = event => {
    if (event.charCode === 13 && this.state.text.trim() !== "") {
      this.writeMessageToDB([this.state.username, this.state.text]);
      this.setState({ text: "" });
    }
  };

  writeMessageToDB = message => {
    const messageRef =
      this.state.clickedChatId === ""
        ? "chat" + this.state.chatID
        : this.state.clickedChatId;
    firebase
      .database()
      .ref(messageRef)
      .push({
        text: message
      });
  };

  getMessages = () => {
    const messageRef =
      this.state.clickedChatId === ""
        ? "chat" + this.state.chatID
        : this.state.clickedChatId;
    var messagesDB = firebase
      .database()
      .ref(messageRef)
      .limitToLast(500);
    messagesDB.on("value", snapshot => {
      let newMessages = [];
      snapshot.forEach(child => {
        var message = child.val();
        newMessages.push({ id: child.key, text: message.text });
      });
      this.setState({ messages: newMessages });
    //   this.bottomSpan.scrollIntoView({ behavior: "smooth" })
    });
  };

  renderMessages = () => {
    return this.state.messages.map(message => (
      <ListItem key={message.id}>
        {message.text[0] === this.state.username ? (
          <ListItemText
            style={{ wordBreak: "break-word" }}
            primary={
              <>
                <Typography component="span" className="messageFloatRight">
                  {message.text[1]}
                </Typography>
              </>
            }
          />
        ) : (
          <ListItemText
            style={{ wordBreak: "break-word" }}
            primary={
              <>
                <Typography
                  component="span"
                  // className={classes.left}
                  color="textPrimary"
                  fontWeight="fontWeightBold"
                >
                  <Box component="span" fontWeight="fontWeightBold" mr={2}>
                    {message.text[0]}:
                  </Box>
                </Typography>
                <Typography component="span">{message.text[1]}</Typography>
              </>
            }
          />
        )}
      </ListItem>
    ));
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Box
          p={1}
          display="flex"
          bgcolor="background.paper"
        >
          <Box p={2}>
            <List dense className="list">
              {this.state.chatData.map((chat, index) => (
                <ListItem
                  key={chat.chatID}
                  button
                  className="listItem"
                  onClick={e => {
                    this.handleClick(chat);
                  }}
                >
                  {chat.friendName}
                </ListItem>
              ))}
            </List>
          </Box>

          <Box p={1} className="box2" flexGrow={1}>
            {this.state.clickedFriendName == "" ? (
              <Typography>Choose a user to chat</Typography>
            ) : (
              <List>
                <Typography>
                    You are chatting with {this.state.clickedFriendName}
                </Typography>
                <hr />
                <List className="chatSpace">
                    {this.renderMessages()}
                    {/* <span ref={el => (this.bottomSpan = el)} /> */}
                </List>
                <TextField
                  autoFocus={true}
                  multiline={true}
                  rowsMax={3}
                  placeholder="Type something.."
                  onChange={event =>
                    this.setState({ text: event.target.value })
                  }
                  value={this.state.text}
                  onKeyPress={this.onSubmit}
                  fullWidth
                />
              </List>
            )}
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Chat;
