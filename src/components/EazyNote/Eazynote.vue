<template>
<el-form ref="editForm" :model="editForm" :ruels="editFormRules">
<el-form-item
  label="获奖年份"
  prop="awardYear"
  >
  <el-input-number
    v-model="editForm.awardYear"
    :min="1"
    label="描述文字"
    size="small"
  />
</el-form-item>
<el-form-item label="展示图片" prop="awardPic">
<div style="display:flex">
  <el-upload
    v-model="editForm.awardPic"
    drag
    :action="actionUrl"
    :on-success="editSuccess"
    multiple
  >
    <i class="el-icon-upload" />
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

    <div
      slot="tip"
      class="el-upload__tip"
    >只能上传jpg/png/jpeg文件，且不超过2M</div>
    <div
      slot="tip"
      class="el-upload__tip"
      style="line-height: 20px"
    >建议图片尺寸1600x1200 或 1200X1200,否则展示效果可能不佳</div>
  </el-upload>
  <el-image :src="editForm.awardPic" style="width: 150px; height: 150px" /> //展示上传的图片
</div>
</el-form-item>
<div style="display: flex;flex-wrap: nowrap;justify-content: center;margin-top:40px">
  <el-button type="primary"  @click="editFormSubmit()">提交</el-button>
  <el-button type="">取消</el-button>
</div>
</el-form>
</template>

<script>
export default {
data() {
    return {
      // 编辑
      actionUrl:  + 'http://localhost:8002/api/v1/upload',   //上传文件的后端接口url，不需要传参（组件会把FILE放到参数中）
      editFormRules: {
        awardYear: [
          { required: true, message: '请输入获奖年份', trigger: 'blur' }
        ],
        awardPic: [
          { required: true, message: '请上传获奖图片', trigger: 'blur' }
        ]
      },
      editForm: {},
    }
},
method:{
  editFormSubmit() {
  // 编辑内容后提交
    this.$refs['editForm'].validate((valid) => {
      if (valid) {
        apiEditData(this.editForm).then((res) => {  //apiEditData是向后端提交表单的接口
        if (res.code === 0) {
          this.$message({ message: res.msg, type: 'success' })
          this.initTable()
        } else {
          this.$message({ message: res.msg, type: 'error' })
        }
      })
    } else {
      return false
    }
  })
},
editSuccess(response, file, fileList) {
  console.log(response)
      if (response.code === 0) {
        this.$message.success('文件上传成功!url=' + response.awardPic)
        this.editForm.awardPic = response.awardPic  //赋值后可以在右侧显示成功上传的图像（编辑时也可以这样操作）
      } else {
        this.$message.error('上传图片失败')
      }
    },
  }
}
</script>