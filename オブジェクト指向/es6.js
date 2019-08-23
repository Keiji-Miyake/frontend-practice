'use strict';
class Mail {
  set sender(email) {
    this._sender=email
  }
  get sender() {
    return this._sender
  }
  sendMail() {
    console.log(this._sender)
  }
}
const mail = new Mail()
mail.sender = 'test@example.com'
mail.sendMail()