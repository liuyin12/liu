<template>
  <div class="contanier">
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <!-- 表单 -->
            <el-from :model="userForm" label-width="120px">
              <el-from-item label="编号">{{userForm.id}}</el-from-item>
              <el-from-item label="手机">{{userForm.mobile}}</el-from-item>
              <el-from-item label="媒体名称">
                <el-input v-model="userForm.name"></el-input>
              </el-from-item>
              <el-from-item label="媒体介绍">
                <el-input type="textarea" :rows="3"></el-input>
              </el-from-item>
              <el-from-item label="邮箱">
                <el-input v-model="userForm.email"></el-input>
              </el-from-item>
              <el-from-item>
                <el-button type="primary">保存设置</el-button>
              </el-from-item>
            </el-from>
          </el-col>
          <el-col :span="12">
            <!-- 上传头像 -->
            <el-upload
             class="avatar-uploader"
            action=""
            :http-request="myUpload"
            :show-file-list="false"

            >
              <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center;font-size:14px;">修改头像</p>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm74')).token
      },
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      }
    }
  },
  created () {
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    // handleSuccess (res) {
    //   // res.data.photo 修改后的新头像
    //   console.log(res.data.photo)
    // },
    myUpload (data) {
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$http.patch('user/photo', formData).then(res => {
        const url = res.data.data.photo
        // 修改头像成功  res.data.data.photo  地址
        this.$message.success('修改头像成功')
        this.userForm.photo = url
        // 1. 更新home组件的头像
        eventBus.$emit('updateHeaderPhoto', url)
        // 2. 更新本地存储的头像
        const userInfo = JSON.parse(window.sessionStorage.getItem('hm74'))
        userInfo.photo = url
        window.sessionStorage.setItem('hm74-toutiao', JSON.stringify(userInfo))
      })
    },
    // 获取用户信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 修改用户信息
    async updateUserInfo () {
      const { data: { data } } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      // 传当前修改的用户名称给home组件  修改home组件的数据  用户名称
      eventBus.$emit('updateHeaderName', data.name)
      // 更新本地存储的用户名称
      const userInfo = JSON.parse(window.sessionStorage.getItem('hm74'))
      userInfo.name = data.name
      window.sessionStorage.setItem('hm74', JSON.stringify(userInfo))
    }
  }
}
</script>

<style scoped lang='less'>
</style>
