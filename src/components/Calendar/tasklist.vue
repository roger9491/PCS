<template>
  <div class="dialog-container">
    <div class="close">
      <i class="el-icon-close" @click="close"></i>
    </div>
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="標題" prop="type">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="時間" prop="type">
        <el-date-picker size="large" v-model="datavalue" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="內容" prop="type">
        <el-input size="medium" type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-button type="primary" @click="set_task">儲存</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    inputtask: Object,
    isEdit: Boolean,
  },
  data() {
    return {
      showMask: false,
      form: {
        title: "",
        desc: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },

      },
      datavalue: "",
    };
  },
  watch: {
    isEdit: function () {
      console.log("ised", this.isEdit);
      if (this.isEdit == false) {
        console.log("clear")
        this.form.title = ""
        this.form.desc = ""
        this.datavalue = ""
      }
    },
    inputtask: function (){
      if (this.isEdit){
        
        this.form.title =  this.inputtask["title"]
        this.form.desc =  this.inputtask["content"]
        this.datavalue =  this.inputtask["date"]
        console.log("input task")
        console.log(this.inputtask, this.form, this.datavalue)
      }
    }
    
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    close() {
      console.log("close!");
      console.log(this.form.title, this.form.desc)
      console.log("asdasd", this.inputtask, this.inputtask["title"], this.inputtask["content"])
      this.$emit("close");
    },

    set_task(){
      this.$emit("set_task", this.form, this.datavalue, this.isEdit,this.inputtask);
    }

  },
};
</script>
<style lang="less" scoped>
.dialog-container {
  //設置中心

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 100;
  width: 400px;
  height: 600px;
  background: #ffffff;

  box-sizing: border-box;
  padding: 15px 10px;
  transform: translate(-50%, -50%);
  border-radius: 8px;

  box-shadow: 12px 15px 40px #9a9c9e;
  display: flex;
  flex-direction: column;

  .close {
    height: 40px;
    display: flex;
    flex-direction: row-reverse;

    .el-icon-close {
      font-size: 25px;
      top: 5px;
      right: 5px;
      position: fixed;
      z-index: 100;
    }
  }
}

::v-deep .el-form-item__label {
  font-size: 20px;
  padding-left: 5px;
  padding-right: 0px;
  text-align: left;
}

::v-deep .el-textarea__inner {
  padding-bottom: 300px;
}
</style>
