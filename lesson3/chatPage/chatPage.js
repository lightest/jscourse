var chatPage = {
	
    chatDOM: null,

    init: function () {
        this.chatDOM = document.querySelector('#chat.page');
        
        this.bindUIActions();
    },


    _onSend: function () {
        var inputText = this.chatDOM.querySelector('input').value;
        this.chatDOM.querySelector('input').value = '';
        var messages = document.querySelector('.messages');
		var currentdate = new Date();
		var data =  currentdate.getHours() + ":" + currentdate.getMinutes();
        var html = '<div class="message-wrapper me"><div class="message"><div class="message-time">' + data + '</div><div class="message-text">' + inputText + '</div></div></div>';

		messages.insertAdjacentHTML('beforeend', html);

    },

    bindUIActions: function () {
        var btnSend = this.chatDOM.querySelector('button');
        btnSend.addEventListener('click', this._onSend.bind(this));
    }

};