var SocialMessageComponent = React.createClass({
  componentDidMount: function(){
    var self = this;
    setTimeout(function(){
      self.setState({"invisible": true})
      setTimeout(function(){
        self.setState({"disabled": true})
      }, 1000)
    }, 3000)
  },
  propTypes: {
    message: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    invisible: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
  },
  getInitialState: function(){
    return {"invisible":this.props.invisible, "disabled": false}
  },
  render: function(){
    var specialClassName = this.state.invisible ? " hidden " : " "
    var disabledClassName = this.state.disabled ? " disabled" : ""
    return (
        <div id={this.props.index} className={"social-message" + specialClassName + disabledClassName}>
          <h3 className="message">{this.props.message}</h3>
          <h4 className="author">{this.props.author}</h4>
        </div>
      );
  }
})
window.SocialComponent = React.createClass({
  getInitialState: function(){
    return {"formEnabled": false, "message": "", "author": "", "current_queue_index": 0, "message_queue": []};
  },
  componentDidMount: function(){
    var self = this;
    STRAWBERRI.ws.messaging.onNewMessage(function(data){
      var current_queue = self.state.message_queue;
      current_queue.push({"message":data.message, "author": data.author, "index": self.state.current_queue_index})
      if(current_queue.length >= 10)
        current_queue.shift();
      self.setState({"message_queue":current_queue,"current_queue_index":self.state.current_queue_index+1})
    });
  },
  toggleForm: function() {
    if(this.state.formEnabled)
      this.setState({"formEnabled": false});
    else
      this.setState({"formEnabled": true});
  },
  propTypes: {
    pushed: React.PropTypes.bool.isRequired,
  },
  __handleAuthorChange: function(event){
    this.setState({author: event.target.value});
  },
  __handleMessageChange: function(event){
    this.setState({message: event.target.value});
  },
  __onSubmit: function(){
    STRAWBERRI.ws.messaging.sendNewMessage(this.state.message, this.state.author)
    this.setState({"formEnabled":  false})
  },
  render: function() {
  	var specialClassName = this.props.pushed ? " pushed" : "";
    var specialFormClassName = this.state.formEnabled ? " enabled" : "";
    var _messages = [];
    var allowed_indices = [this.state.current_queue_index-1, this.state.current_queue_index-2, this.state.current_queue_index-3]
    for(var id in this.state.message_queue){
      var _message = this.state.message_queue[id];
      var invisible = true;
      if(allowed_indices.indexOf(_message.index) > -1)
        invisible = false;
      _messages.push(<SocialMessageComponent index={_message.index} key={_message.index} message={_message.message} author={_message.author} invisible={invisible}/>)
    }
    return (
      <div className="socialform">
        <div className={"social" + specialClassName} onClick={this.toggleForm}>
          <i className="fa fa-pencil-square-o"></i>
        </div>
        <div className={"messageForm"+ specialFormClassName}>
          <input type="text" placeholder="name" className="author" value={this.state.author} onChange={this.__handleAuthorChange} />
          <textarea className="message" placeholder="message"  value={this.state.message} onChange={this.__handleMessageChange} ></textarea>
          <input type="button" value="Send" className="sendBtn" onClick={this.__onSubmit}/>
        </div>
        <div className="messages-box">
          {_messages}
        </div>
      </div>
    );
  },

});