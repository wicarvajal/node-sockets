const fs = require('fs');

class Ticket {
  constructor(number, desk) {
    this.number = number;
    this.desk = desk;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.pendingTickets = [];

    let data = require('../data/data.json');

    if (data.today === this.today) {
      this.last = data.last;
      this.pendingTickets = data.pendingTickets;
    } else {
      this.restartCount();
    }

  }

  restartCount() {
    this.last = 0;
    this.pendingTickets = [];
    this.saveFile();
  }

  nextTicket() {
    this.last++;
    let ticket = new Ticket(this.last, null);
    this.pendingTickets.push(ticket);
    this.saveFile();
    return `Ticket: ${this.last}`;
  }

  saveFile() {
    let jsonData = {
      last: this.last,
      today: this.today,
      pendingTickets: this.pendingTickets
    }

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }
  
  getLastTicket() {
    return `Ticket: ${this.last}`;
  }
}


module.exports = {
  TicketControl
}