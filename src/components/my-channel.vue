<template>
<!-- 给选框注册change事件 -->
    <el-select :value="value" @change="fn">
        <!-- 给下拉选项使用v-for频繁切换  -->
        <el-option v-for="item in channelOptions" :key="item .id"
        :label="item.name" :value="item.id"></el-option>

    </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  // 当初始化之后触发created
  created () {
    // 获取频道数据
    this.getChannelOptions()
  },
  methods: {
    // fn
    fn (value) {
      // value 是选中的值
      this.$emit('input', value)
    },
    // 获取频道数据
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      // 选框中的显示的内容等于从后台响应回的数据
      this.channelOptions = data.channels
    }
  }

}
</script>

<style>

</style>
