<template>
  <v-card
    class="register-card"
    elevation="4"
  >
    <v-card-title class="title">
      <span>Register</span>
    </v-card-title>

    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="handleRegister"
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

        <v-text-field
          v-model="firstName"
          label="First Name"
          :rules="firstNameRules"
          placeholder="Enter your first name"
          outlined
          required
        />

        <v-text-field
          v-model="lastName"
          label="Last Name"
          :rules="lastNameRules"
          placeholder="Enter your last name"
          outlined
          required
        />

        <v-text-field
          v-model="age"
          label="Age"
          :rules="ageRules"
          placeholder="Enter your age"
          outlined
          required
          type="number"
        />

        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          placeholder="Enter your email"
          outlined
          required
        />

        <v-btn
          type="submit"
          class="register-btn"
          block
          large
          :disabled="!valid"
        >
          Register
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center pb-5">
      <span class="text-body-2">
        Already have an account?
      </span>

      <v-btn
        text
        class="text-body-3"
        to="/login"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  name: 'RegisterForm',

  data() {
    return {
      valid: false,

      username: '',
      password: '',
      firstName: '',
      lastName: '',
      age: '',
      email: '',

      showPassword: false,

      usernameRules: [
        v => !!v || 'Username is required'
      ],

      passwordRules: [
        v => !!v || 'Password is required'
      ],

      firstNameRules: [
        v => !!v || 'First name is required'
      ],

      lastNameRules: [
        v => !!v || 'Last name is required'
      ],

      ageRules: [
        v => !!v || 'Age is required',
        v => Number(v) > 0 || 'Age must be greater than 0'
      ],

      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email is not valid'
      ]
    }
  },

  methods: {
    async handleRegister() {
      const isValid = this.$refs.form.validate()

      if (!isValid) {
        return
      }

      try {
        const response = await this.axios.post(
          'http://127.0.0.1:3000/api/v1/register',
          {
            username: this.username,
            password: this.password,
            first_name: this.firstName,
            last_name: this.lastName,
            age: Number(this.age),
            email: this.email
          }
        )

        eventBus.$emit('show-alert', {
          type: 'success',
          message: response.data.message
        })

        this.$router.push('/login')
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
.register-card {
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

.register-btn {
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
