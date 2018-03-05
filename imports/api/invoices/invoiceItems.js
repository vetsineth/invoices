import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
const InvoiceDetails = new Mongo.Collection('invoiceDetails')
InvoiceDetails.schema = new SimpleSchema({
  name: {
    type: String,
  },
  qty: {
    type: Number,
  },
  price: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  invoiceId: {
    type: String,
  },
})
InvoiceDetails.attachSchema(InvoiceDetails.schema)

export default InvoiceDetails
