const mongoose = require('mongoose');
require('dotenv').config();

const Account = require('./models/Account');
const Booking = require('./models/Booking');
const Branch = require('./models/Branch');
const Court = require('./models/Court');
const CourtType = require('./models/CourtType');
const Human = require('./models/Human');
const Payment = require('./models/Payment');
const PriceList = require('./models/PriceList');
const Staff = require('./models/Staff');
const Voucher = require('./models/Voucher');

async function init() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Insert dummy documents (with minimal required fields)
  await Promise.all([
    Human.create({ name: 'Admin', phone: '0987654321' }),
    Account.create({ humanId: '68a993f85e472db9bc93b524', username: 'admin', passwordHash: 'admin', role: 'owner' }),
    Branch.create({ ownerId: null, name: null, phone: null, address: null }),
    CourtType.create({ branchId: null, name: null }),
    Court.create({ branchId: null, courtTypeId: null, name: null }),
    Staff.create({ humanId: null, branchId: null }),
    Voucher.create({ name: null, percentage: null, startDate: null, endDate: null }),
    PriceList.create({ branchId: null, courtTypeId: null, price: 0, date: 1 }),
    Booking.create({ customerId: null, courtId: null, bookingTime: null, startTime: null, endTime: null }),
    Payment.create({ bookingId: null, voucherId: null, paymentMethod: null, timePayment: null, amountPaid: 0, remain: 0 })
  ]).catch(() => { /* ignore errors for null refs in dummy data */ });

  console.log('Collections initialized!');
  await mongoose.disconnect();
}

init();