import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import SimpleSchema from 'simpl-schema'
import rateLimit from '../../lib/rate-limits.js'
import _ from 'lodash'

import Invoices from '../../api/invoices/invoices.js'
import InvoiceDetails from '../../api/invoices/invoiceItems.js'
export const findInvoices = new ValidatedMethod({
  name: 'findInvoices',
  mixins: [CallPromiseMixin],
  validate: null,
  run(selector, options) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(200)
      selector = selector || {}
      options = options || {}
      return Invoices.find(selector, options).fetch()
    }
  },
})
// Find One
export const findOneInvoice = new ValidatedMethod({
  name: 'findOneInvoice',
  mixins: [CallPromiseMixin],
  validate: null,
  run(_id) {
    if (Meteor.isServer) {
     let invoice=Invoices.findOne({_id})
     let details=InvoiceDetails.find({invoiceId:_id}).fetch()
     return {invoice,details}
    }
  },
})
//Insert
export const insertInvoice = new ValidatedMethod({
  name: 'insertInvoice',
  mixins: [CallPromiseMixin],
  validate: null,
  run(doc) {
    if(Meteor.isServer){
      let invoiceId
      try {
        const items=doc.items
        Invoices.insert(doc,(error,result)=>{
          invoiceId=result
          if(!error){
            _.forEach(items,o=>{
              o.invoiceId=invoiceId
              InvoiceDetails.insert(o)
            })
          }
        })
      } catch (error) {
        InvoiceDetails.remove({invoiceId:invoiceId})
        Invoices.remove({_id:invoiceId})
        throw new Meteor.Error("My Error")
      }
      return "Success"
    }
  }
})
// Update
export const updateInvoice = new ValidatedMethod({
  name: 'updateInvoice',
  mixins: [CallPromiseMixin],
  validate: null,
  run(doc) {
    if (!this.isSimulation) {
      const oldData = findOneInvoice.run(doc._id)
      try {
        const items=doc.items
        const _id = doc._id
        Invoices.update({ _id: doc._id}, { $set: doc }, (error, result)=>{
          if(!error){
           InvoiceDetails.remove({ invoiceId:_id }, rmError=>{
             if(!rmError){
               _.forEach(items,o=>{
                 o.invoiceId=_id
                 InvoiceDetails.insert(o)
               })
             }
           })
          }
        })
      } catch (error) {
        insertInvoice.run(oldData.invoice, oldData.Details)
        throw new Meteor.Error('Update error', 'Invoice update error', error)
      } 
      return "Success"   
    }
  },
})
//remove
export const removeInvoice = new ValidatedMethod({
  name: 'removeInvoice',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run(selector) {
    if (Meteor.isServer) {
      return Invoices.remove(selector)
    }
  },
})

rateLimit({
  methods: [
    findInvoices,
    findOneInvoice,
    insertInvoice,
    updateInvoice,
    removeInvoice,
  ],
})
