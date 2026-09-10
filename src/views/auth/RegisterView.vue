<template>
  <div class="login-page">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue'

export default {
  name: 'Register',

  components: {
    RegisterForm
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 24px;
}
</style>
