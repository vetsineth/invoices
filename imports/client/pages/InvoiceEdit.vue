<template>
  <div>
    <router-view></router-view>
    <h4>Edit Invoices</h4>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      v-loading="loading"
      label-width="120px"
    >
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item
            label="Date"
            required
          >
            <el-form-item prop="date">
              <el-date-picker
                format="dd/MM/yyyy"
                size="small"
                type="date"
                placeholder="Pick a Date"
                v-model="form.date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            </el-form-item>
            <el-form-item
              label="Number Ref"
              prop="refNumber"
            >
              <el-input
                v-model="form.refNumber"
                size="small"
              ></el-input>
                </el-form-item>
                <el-form-item
                  label="Customer Name"
                  prop="cusName"
                >
                  <el-select
                    v-model="form.cusName"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option
                      v-for="item in customerName"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                      </el-option>
                      </el-select>
                      </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Memo"
            prop="memo"
          >
            <el-input
              v-model="form.memo"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              size="small"
            >
              </el-input>
              </el-form-item>
        </el-col>
      </el-row>

      <!--Sub Items List-->
      <invoice-items
        :items-prop="initItem"
        @subitem-change="handleSubitemChange"
      >
        </invoice-items>
        <br><br>
        <el-row :gutter="10">
          <el-col :offset="16">
            <el-form-item
              label="Total: "
              prop="total"
            >
              <el-input
                v-model="total"
                style="width: 200px"
                :readonly="readOnly"
              >{{ total }}</el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <br><br>
        <el-row :gutter="10">
          <el-col :offset="15">
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm"
              >Save</el-button>
                <el-button
                  type="primary"
                  @click="handleCancel"
                >Cancel</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
  </div>
</template>
<script>
import _ from "lodash";
import moment from "moment";
import InvoiceItems from "../component/invoiceItems.vue";
import { findOneInvoice, updateInvoice } from "../../api/invoices/methods";
export default {
  name: "InvoiceEdit",
  components: {
    invoiceItems: InvoiceItems
  },
  data() {
    return {
      readOnly: true,
      deleteAction: false,
      loading: false,
      name: [],
      total: 0,
      initItem: [],
      items: [],
      form: {
        date: moment().toDate(),
        refNumber: "",
        cusName: "",
        memo: ""
      },
      customerName: [
        { label: "Sineth", value: "Sineth" },
        { label: "Lichea", value: "Lichea" },
        { label: "Dimong", value: "Dimong" },
        { label: "Kunthea", value: "Kunthea" }
      ],
      rules: {
        date: [
          {
            required: true,
            message: "Please Pick a DOB",
            trigger: "blur"
          }
        ],
        refNumber: [
          {
            required: true,
            message: "Number is requied"
          }
        ],
        memo: [
          {
            required: true
          }
        ]
      }
    };
  },
  mounted() {
    this.getInvoices();
  },
  methods: {
    getInvoices() {
      const _id = this.$route.params._id;
      findOneInvoice
        .callPromise(_id)
        .then(result => {
          if (result) {
            console.log(result);
            this.form = result.invoice;
            this.total = result.invoice.total;
            this.initItem = result.details;
          }
        })
        .catch(err => {
          console.log(err.reason);
        });
    },
    handleSubitemChange(items) {
      this.items = items;
      let total = 0;
      items.forEach(o => {
        total += o.amount;
      });
      return (this.total = total);
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this.form.total = this.total;
          this.form.items = this.items;
          updateInvoice
            .callPromise(this.form)
            .then(result => {
              this.loading = false;
              this.$notify({
                type: "success",
                position: "bottom-right",
                title: "Success",
                message: "Your transaction is success"
              });
              this.handleReset();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    handleReset() {
      this.$refs["form"].resetFields();
    },
    handleCancel() {
      this.$router.push({ name: "invoice" });
    }
  }
};
</script>