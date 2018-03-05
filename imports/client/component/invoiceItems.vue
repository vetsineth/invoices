<template>
  <div>
    <router-view></router-view>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
    >
      <!-- Items List -->
      <el-table
        :data="form.items"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="No"
          prop="No"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="Item"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'items.'+ scope.$index +'.name'"
              :rules="rules.name"
            >
              <el-select
                v-model="scope.row.name"
                size="small"
              >
                <el-option
                  v-for="item in itemOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="qty"
          label="Quantities"
        >
          <template slot-scope="scope">
            <el-form-item
              :key="scope.$index + '.qty'"
              :prop="'items.'+ scope.$index +'.qty'"
              :rules="rules.qty"
            >
              <el-input
                v-model.number="scope.row.qty"
                size="small"
                @keyup.native="handleAmountChange(scope.row)"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="Price"
        >
          <template slot-scope="scope">
            <el-form-item
              :key="scope.$index + '.price'"
              :prop="'items.'+ scope.$index +'.price'"
              :rules="rules.price"
            >
              <el-input
                v-model.number="scope.row.price"
                size="small"
                @keyup.native="handleAmountChange(scope.row)"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="Amount"
        >
          <template slot-scope="scope">
            <el-form-item
              :key="scope.$index + '.amount'"
              :prop="'items.'+ scope.$index +'.amount'"
            >
              <el-input
                v-model="scope.row.amount"
                size="small"
                :readonly="readOnly"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="Action"
          width="80px"
        >
          <template slot-scope="scope">
            <el-button v-if="form.items.length > 1"
                       type="text"
                       icon="el-icon-remove"
                       @click="deleteItem(scope.row)"
            >
            </el-button>
            <el-button
              v-if="(form.items.length - 1) === scope.$index"
              type="text"
              icon="el-icon-circle-plus"
              @click="addItem"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'InvoiceItems',
  props: {
    itemsProp: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      deleteAction: false,
      readOnly: true,
      itemOpts: [
        { label: 'ABC', value: 'ABC' },
        { label: 'Tiger', value: 'Tiger' },
        { label: 'Anchor', value: 'Anchor' },
        { label: 'Leo', value: 'Leo' },
      ],
      form: {
        items: this.itemsProp,
      },
      rules: {
        name: [
          {
            required: true,
          },
        ],
        qty: [
          {
            required: true,
          },
        ],
        price: [
          {
            required: true,
          },
        ],
      },
    }
  },
  watch: {
    itemsProp: {
      handler: function(val) {
        this.form.items = val
      },
      deep: true,
    },
    'form.items': {
      handler: function(val, oldVal) {
        this.itemChange(val)
      },
      deep: true,
    },
  },
  methods: {
    addItem() {
      this.form.items.push({
        name: '',
        qty: 0,
        price: 0,
        amount: 0,
      })
    },
    deleteItem(item) {
      const index = this.form.items.indexOf(item)
      if (index !== -1) {
        this.deleteAction = index < this.form.items.length - 1 ? true : false
        this.$nextTick(() => {
          this.form.items.splice(index, 1)
        })
      }
    },
    handleAmountChange(row) {
      row.amount = row.qty * row.price
    },
    itemChange(val) {
      this.$emit('subitem-change', val)
    },
  },
}
</script>