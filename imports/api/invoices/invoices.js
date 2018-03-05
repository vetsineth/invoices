import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
const Invoices = new Mongo.Collection('invoices')
Invoices.schema = new SimpleSchema({
  date: {
    type: Date,
  },

  cusName: {
    type: String,
  },
  total: {
    type: Number,
  },
  refNumber: {
    type: String,
  },
  memo: {
    type: String,
    optional: true,
  },
})
Invoices.attachSchema(Invoices.schema)

export default Invoices
