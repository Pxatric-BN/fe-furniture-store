<template>
    <div>
        <v-card class="users-card">
        <v-card-title>
            <span class="text-h6">Users</span>
        </v-card-title>
    
        <v-data-table
            :headers="headers"
            :items="users"
            :loading="loading"
            class="users-table"
        >
            <template v-slot:[`item.isApprove`]="{ item }">
            <span v-if="item.isApprove" class="approved-text">Approved</span>
            <span v-else>Not Approved</span>
            </template>
    
            <template v-slot:[`item.action`]="{ item }">
            <v-btn
                color="success"
                @click="approveUser(item)"
                :disabled="item.isApprove"
            >
                Approve
            </v-btn>
            </template>
        </v-data-table>
        </v-card>
    </div>
</template>
<script>
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
    // Get all users
    async getUsers () {
      try {
        const response = await this.axios.get('http://127.0.0.1:3000/api/v1/users')
            console.log('Users API:', response.data)

         this.users = response.data.data

      } catch (error) {
        console.error('Get users error:', error)
      } finally {
        this.loading = false
      }
    },

    // Approve user
    async approveUser (user) {
      try {
        const token = localStorage.getItem('token')

        const response = await this.axios.put(`http://127.0.0.1:3000/api/v1/users/${user._id}/approve`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('Approve user response:', response.data)
        user.isApprove = true
      } catch (error) {
        console.error('Approve user error:', error)
      }
    }
  }
}
</script>

<style scoped>
.admin-users {
  padding: 32px;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.page-header p {
  margin: 4px 0 0;
  color: #888;
}

/* Card */
.users-card {
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

/* Table */
.users-table {
  padding: 8px;
}

/* Approved */
.approved-text {
  color: #4caf50;
  font-size: 13px;
}
</style>
