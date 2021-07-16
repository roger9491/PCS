<template>
  <div>
    <el-button @click="isShow = !isShow">Click Me</el-button>
    <el-collapse-transition>
      <div v-show="isShow">
        <div class="dialog-container">
          <div class="close">
            <i class="el-icon-close" @click="close"></i>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-collapse-transition>
</div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      isShow: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  text-align: center;
  display: flex;
}
</style>
