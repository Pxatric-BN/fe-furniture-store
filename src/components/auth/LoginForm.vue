<template>
  <v-card
    class="login-card"
    elevation="4"
  >
    <v-card-title class="title">
      <span>
        Login
      </span>
    </v-card-title>

    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="handleLogin"
      >
        <v-text-field
          v-model="username"
          label="Username"
          :rules="usernameRules"
          placeholder="Enter your username"
          outlined
          required
        />

        <v-text-field
          v-model="password"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          placeholder="Enter your password"
          outlined
          required
          @click:append="showPassword = !showPassword"
        />

        <v-btn
          type="submit"
          class="login-btn"
          block
          large
          :disabled="!valid"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center pb-5">
      <span class="text-body-2">
        Don't have an account?
      </span>

      <v-btn
        text
        class="text-body-3"
        to="/register"
      >
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  name: 'LoginForm',

  data() {
    return {
      valid: false,
      username: '',
      password: '',
      showPassword: false,

      usernameRules: [
        v => !!v || 'Username is required'
      ],

      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },

  methods: {
    async handleLogin() {
      const isValid = this.$refs.form.validate()

      if (!isValid) {
        return
      }

      try {
        const response = await this.axios.post(
          'http://127.0.0.1:3000/api/v1/login',
          {
            username: this.username,
            password: this.password
          }
        )

        const { token, role } = response.data.data
        
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
      
        eventBus.$emit('show-alert', { type: 'success', message: response.data.message })

        this.$router.push('/')
      } catch (error) {

        eventBus.$emit('show-alert', { 
            type: 'error', 
            message: error.response?.data?.message || 'Something went wrong' 
          })
      }
    }
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 18px;
  overflow: visible;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
}

.title {
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #333333;
}

.login-btn {
  background-color: black !important;
  color: white !important;
}

.text-body-2 {
  font-size: 12px;
  color: #777777;
}

.text-body-3 {
  margin-left: 4px;
  font-size: 16px;
  color: #2F39A9;
}
</style>