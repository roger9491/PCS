<template>
  <div id="app" class="text" v-cloak>
    <el-container>
      <el-aside width="200px">
        <el-button type="primary" plain @click="handleOpen">主要按钮</el-button>
        <el-menu

          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

        </el-menu>
      </el-aside>

      <el-header>
        <el-main> asdasd </el-main>
      </el-header>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true, 
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    };
  },
  methods: {
    handleOpen() {
      this.isCollapse = !(this.isCollapse);
    },
     handleNodeClick(data) {
        console.log(data);
      }

  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 199px;
  min-height: 400px;
}
</style>
