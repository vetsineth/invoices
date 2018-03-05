<template>
  <div>
    <router-view></router-view>
    <el-button
      type="primary"
      @click="handleNew"
    >Add new</el-button>
      <data-tables
        :data="InvoicOpt"
        :action-col-def="actionColDef"
        :search-def="searchDef"
      >
        <el-table-column
          v-for="title in titles"
          :prop="title.prop"
          :label="title.label"
          :key="title.label"
          :fixed="title.fixed"
          :width="title.width"
          :formatter="title.dateFormatter"
        >
          </el-table-column>
          </data-tables>
  </div>
</template>
<script>
import moment from "moment";
import { findInvoices, removeInvoice } from "../../api/invoices/methods.js";
export default {
  name: "Invoice",
  data() {
    return {
      loading: false,
      InvoicOpt: [],
      searchDef: {
        show: false
      },
      titles: [
        {
          label: "Date",
          prop: "date",
          dateFormatter: (row, column) => {
            var date = row[column.property];
            if (date == undefined) {
              return "";
            }
            return moment(date).format("LL");
          },
          width: 150
        },
        {
          label: "CustomerName",
          prop: "cusName"
        },
        {
          label: "Total",
          prop: "total"
        },
        {
          label: "ReferenceNumber",
          prop: "refNumber"
        }
      ],
      // Dropdown Button
      actionColDef: {
        label: "Actions",
        width: 150,
        fixed: "right",
        tableColProps: {
          align: "center"
        },
        def: [
          {
            handler: row => {
              this.edit(row);
            },
            buttonProps: {
              type: "text"
            },
            name: "Edit"
          },
          {
            icon: "message",
            type: "text",
            handler: row => {
              this.delete(row);
            },
            name: "Delete"
          }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      findInvoices
        .callPromise()
        .then(result => {
          this.InvoicOpt = result;
          this.loading = false;
        })
        .catch(error => {
          console.log(error.reason);
        });
    },
    handleNew() {
      this.$router.push({ name: "invoiceNew" });
    },
    handleCommand(command) {
      this[command.action](command.row);
    },
    edit(row) {
      this.$router.push({ name: "invoiceEdit", params: { _id: row._id } });
    },
    delete(row) {
      this.$confirm("This will permanently delete. Continue?", "Warning", {
        type: "warning"
      })
        .then(() => {
          removeInvoice
            .callPromise({ _id: row._id })
            .then(result => {
              this.$notify({
                type: "success",
                position: "bottom-right",
                title: "Success",
                message: "Your transaction is success"
              });

              this.getData();
            })
            .catch(error => {
              console.log(error.reason);
            });
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            position: "bottom-right",
            title: "Warning",
            message: "Your transaction is canceled"
          });
        });
    }
  }
};
</script>

