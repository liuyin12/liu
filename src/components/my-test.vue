<template>
    <div class="container">
        <p>内容</p>
        <p><slot></slot></p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      innerData:
            '组件内部数据'
    }
  }
}
</script>

<style scoped lang='less'>

</style>
