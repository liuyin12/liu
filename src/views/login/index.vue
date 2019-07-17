<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 登录表单 -->
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑   把value拿出来进行手机号的格式校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '17613634385',
        code: '246810'
      },
      // 表单验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 发请 promise对象 给你发请求
          // try{ 业务逻辑 }catch(err){ 处理错误 }
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('hm74', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
      // 对表单进行校验  在valid前加async与后面的await配合是要买好
      // this.$refs.loginForm.validate(async valid => {
      //   // 判断valid的值
      //   if (valid) {
      //     // 如果有token就进入的试一试中
      //     try {
      //       // 声明一个变量用来 保存发送请求的数据  参数一是请求的地址  参数二是表单的数据
      //       const res = await this.$http.post('authorizations', this.loginForm)
      //       // 获取本地储存参数一是文件的名称  参数二是把数组data对象转换为json字符串
      //       window.sessionStorage.setItem('hm74', JSON.stringify(res.data.data))
      //       // 编程显示路由跳转到的
      //       this.$router.push('/')
      //     } catch (err) { // 当没有找到本地的token信息的时候返回错误信息进行提示
      //       this.$message.error('手机号码或者是验证码错误')
      //     }
      //   }
      // })
      // 校验对整个表单
      // this.$refs.loginForm.validate(async valid => {
      //   if (valid) {
      //     try {
      //       const res = await this.$http.post('authorizations', this.loginForm)
      //       window.sessionStorage.setItem('hm74', JSON.stringify(res.data.data))
      //       this.$router.push('/')
      //     } catch (err) {
      //       this.$message.error('手机号或者是验证码错误')
      //     }
      //   }
      // })
      // 对整个表单进行校验
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     // 提交登录请求  axios是基于primise封装的 post() 返回值一个promise对象
      //     this.$http
      //       .post(
      //         'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
      //         this.loginForm
      //       )
      //       .then(res => {
      //         // res 是 响应对象  包含 后台返回的数据 res.data
      //         // console.log(res.data) 去做什么事情？？？
      //         // 1. 跳转到首页
      //         // 2. 保存用户的信息  用来判断登录的状态
      //         // 设置本地的存储信息  第一个是名称  第二个是json字符串形式的
      //         window.sessionStorage.setItem('hm74', JSON.stringify(res.data.data))
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         // 提示
      //         this.$message.error('手机号或验证码错误')
      //       })
      //   }
      // })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  // cover 铺面容器 多余的裁剪   contain 在容器内容完全显示图片
  // 背景图定位 / 背景图尺寸
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    width: 400px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
