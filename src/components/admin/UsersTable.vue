<template>
  <div class="admin-users">

    
      <div>
        <h1>Users</h1>
        <p>Manage users</p>
      </div>
   

    <v-card
      class="users-card"
      outlined
    >
      <v-card-title class="users-card-title">
        <span>Users</span>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        class="users-table"
        disable-sort
      >
        <template v-slot:[`item.isApprove`]="{ item }">
          <span
            v-if="item.isApprove"
            class="status approved"
          >
            Approved
          </span>

          <span
            v-else
            class="status not-approved"
          >
            Not Approved
          </span>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            small
            color="success"
            :disabled="item.isApprove"
            @click="approveUser(item)"
          >
            <v-icon
              left
              small
            >
              mdi-check
            </v-icon>

            Approve
          </v-btn>
        </template>

      </v-data-table>
    </v-card>

  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  name: 'AdminUsers',

  data () {
    return {
      loading: false,

      users: [],

      headers: [
        {
          text: 'Username',
          value: 'username'
        },
        {
          text: 'First Name',
          value: 'first_name'
        },
        {
          text: 'Last Name',
          value: 'last_name'
        },
        {
          text: 'Age',
          value: 'age'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Role',
          value: 'role'
        },
        {
          text: 'Status',
          value: 'isApprove',
          sortable: false
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false
        }
      ]
    }
  },

  mounted () {
    this.getUsers()
  },

  methods: {
    async getUsers () {
      this.loading = true

      try {
        const response = await this.axios.get(
          'http://127.0.0.1:3000/api/v1/users'
        )

        console.log('Users API:', response.data)

        this.users = response.data.data
      } catch (error) {
        console.error('Get users error:', error)

        eventBus.$emit('show-alert', {
          type: 'error',
          message: 'Failed to load users'
        })
      } finally {
        this.loading = false
      }
    },

    async approveUser (user) {
      try {
        const token = localStorage.getItem('token')

        const response = await this.axios.put(
          `http://127.0.0.1:3000/api/v1/users/${user._id}/approve`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        eventBus.$emit('show-alert', {
          type: 'success',
          message: response.data.message
        })

        
        user.isApprove = true
      } catch (error) {
        eventBus.$emit('show-alert', {
          type: 'error',
          message:
            error.response?.data?.message ||
            'Something went wrong'
        })
      }
    }
  }
}
</script>

<style scoped>
.admin-users {
  padding: 32px;
}

.users-card {
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.users-card-title {
  padding: 20px 24px;
  font-size: 18px;
  font-weight: 600;
}

.users-table {
  padding: 0 8px 8px;
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.approved {
  color: #2e7d32;
  background: #e8f5e9;
}

.not-approved {
  color: #757575;
  background: #f5f5f5;
}
</style>
