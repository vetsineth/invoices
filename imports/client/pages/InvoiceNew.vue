<template>
  <div>
    <router-view></router-view>
    <h4>New Invoices</h4>
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
                @click="handleSave"
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
import { insertInvoice } from "../../api/invoices/methods";
export default {
  name: "InvoiceNew",
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
      initItem: [
        {
          name: "",
          qty: 0,
          price: 0,
          amount: 0
        }
      ],
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
            message: "Number is requied",
            trigger: "blur"
          }
        ],
        memo: [
          {
            required: true,
            message: "Memo is requied",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubitemChange(items) {
      this.items = items;
      this.items.forEach(o => {
        this.total += o.amount;
      });
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.total = this.total;
          this.form.items = this.items;
          insertInvoice
            .callPromise(this.form)
            .then(result => {
              if (result) {
                this.$notify({
                  type: "success",
                  position: "bottom-right",
                  title: "Success",
                  message: "Your transaction is success"
                });
                this.handleCancel();
              }
            })
            .catch(error => {
              console.log(error.reason);
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