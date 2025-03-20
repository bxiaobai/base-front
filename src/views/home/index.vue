<template>
  <div class="about">
    <h1>home</h1>
  </div>
</template>

<style>

</style>
<script setup lang="ts">

import { healthCheckUsingGet } from '@/api/healthController.ts'
import { MessagePlugin } from 'tdesign-vue-next'

healthCheckUsingGet().then((res) => {
  MessagePlugin.success(res.data.data)
})

</script>
