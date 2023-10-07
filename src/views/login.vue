<template>
  <section class="login-body flex-row">
    <div class="flex"></div>
    <div class="flex flex-col justify-center">
      <pv-form
        v-model="loginForm"
        ref="loginForm"
        class="login-box"
        :option="pageLogin.loginJson"></pv-form>
    </div>
  </section>
</template>

<script setup lang="ts" name="login">
import login from '@/scripts/login';
const loginForm: any = ref();
const pageLogin = reactive({
  loginJson: login,
  userInfo: null
});
</script>
<style lang="scss" scoped>
.login-body {
  background: url('../assets/image/icon_login.jpg') no-repeat left top;
  background-size: cover;
}
</style>
