<template>
  <div
    class="dialog-container"
    ref="contentWrapper"
    :style="{ top: inputtop + 100 + 'px', left: inputleft - 200 + 'px' }"
  >
    <div class="close">
      <i class="el-icon-close" @click="close"></i>
      <div class="option">
        <el-button
          @click="task_edit"
          type="primary"
          icon="el-icon-edit"
          size="small"
          circle
        ></el-button>


        <el-popconfirm title="這項任務確定刪除嗎?" @confirm="task_delete()">
        <el-button
          
          type="danger"
          icon="el-icon-delete"
          size="small"
          circle
          slot="reference"
          
        ></el-button>
        </el-popconfirm>
      </div>
    </div>
    <div class="text-class">
      <div class="title-class">
        <i class="el-icon-star-on" style="color: blue"></i>
        {{ inputtask["Title"] }}
      </div>
      <el-divider></el-divider>
      <div>{{ inputtask["Date"] }}</div>
      <div>{{ inputtask["Content"] }}</div>
    </div>
  </div>
</template>
<script>
import { request } from "../../network/request.js";
export default {
  data() {
    return {
    };
  },
  props: {
    inputleft: Number,
    inputtop: Number,
    inputtask: Object,
  },
  mounted: {},
  methods: {
    close() {
      this.$emit("close");
    },
    task_edit(){
      console.log(this.inputtask)
    },
    task_delete(){
      
      console.log(this.inputtask)
      request({
        url: "/api/calendar",
        method: "delete",
        params:{id:this.inputtask["Id"]} ,
        
      })
        .then((res) => {
          if (res == "fail") {
            console.log("fail");
            return;
          }
          console.log(this.inputtask)
          console.log("res", res);
          this.$emit("task_delete",this.inputtask["Id"],this.inputtask["Date"]);
        })
        .catch((err) => {
          console.log(err);
        });

        
    }
 
  },
};
</script>
<style lang="less" scoped>
.dialog-container {
  //設置中心

  position: fixed;

  z-index: 100;
  width: 400px;
  height: 200px;
  background: #ffffff;

  box-sizing: border-box;
  padding: 15px 10px;
  transform: translate(-50%, -50%);
  border-radius: 8px;

  box-shadow: 12px 15px 40px #9a9c9e;
  display: flex;
  flex-direction: column;

  .close {
    height: 10px;
    display: flex;
    flex-direction: row-reverse;
    .el-icon-close {
      font-size: 25px;
      top: 5px;
      right: 5px;
      position: fixed;
      z-index: 100;
    }
    .option {
      top: 5px;
      right: 40px;
      position: fixed;
    }
    .el-button {
      margin-right: 15px;
    }
  }
}
.text-class {
  text-align: left;


}

.title-class {
  font-size: 30px;
}


.el-divider--horizontal {
  margin: 8px 0;
}
</style>
