const tmi = require("tmi.js");

const chatbox = {
  el: null,
  messages: [],
  appendMessage(author, message) {
    let id = this.messages.push({author: author, message: message});
    this.el.innerHTML += msg(author, message, id);
    window.setTimeout(function() {
      chatbox.removeMessage(id);
    }, 5000);
  },
  removeMessage(msgId) {
    const msg = document.getElementById('msg-' + msgId);
    msg.parentElement.removeChild(msg);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  chatbox.el = document.getElementById('chatbox');
});

const client = new tmi.Client({
    channels: ["kristophersson"],
});

client.connect();

client.on('message', function (channel, tags, message, self) {
  chatbox.appendMessage(tags['display-name'], message);
})

function msg (author, message, id) {
  return `
    <div class="message-wrapper" id="msg-${id}">
        <p>
            <span class="message-author">${author}:</span>
            <span class="message-content">${message}</span>
        </p>
    </div>
  `;
}
