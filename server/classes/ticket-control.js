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
    this.lastFourTickets = [];

    let data = require('../data/data.json');

    if (data.today === this.today) {
      this.last = data.last;
      this.pendingTickets = data.pendingTickets;
      this.lastFourTickets = data.lastFourTickets;
    } else {
      this.restartCount();
    }

  }

  restartCount() {
    this.last = 0;
    this.pendingTickets = [];
    this.lastFourTickets = [];
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
      pendingTickets: this.pendingTickets,
      lastFourTickets: this.lastFourTickets
    }

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }

  getLastTicket() {
    return `Ticket: ${this.last}`;
  }

  getLastFour() {
    return this.lastFourTickets;
  }

  attendTicket(desk) {
    if (this.pendingTickets.length === 0) {

      return 'Sin tickets pendientes';
    }

    let ticketNumber = this.pendingTickets[0].number;
    this.pendingTickets.shift();

    let attend = new Ticket(ticketNumber, desk);

    this.lastFourTickets.unshift(attend);

    if (this.lastFourTickets.length > 4) {
      this.lastFourTickets.splice(-1, 1); // borra el ultimo item del arreglo
    }

    this.saveFile();

    return attend;
  }
}


module.exports = {
  TicketControl
}