<template>
  <div class="container">
    <div class="box">
      <!-- Form Section -->
      <div :class="['form-section', { 'signup-form': !isLogin }]">
        <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
        <p class="subtext">
          {{ isLogin ? 'Don’t have an account yet?' : 'Already have an account?' }}
          <a href="#" @click.prevent="toggleForm">{{ isLogin ? 'Sign Up' : 'Login' }}</a>
        </p>

        <template v-if="!isLogin">
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" v-model="fullName" />
        </template>

        <label>Email Address</label>
        <input type="email" placeholder="you@example.com" v-model="email" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" v-model="password" />

        <template v-if="!isLogin">
          <label>Confirm Password</label>
          <input type="password" placeholder="Re-enter password" v-model="confirmPassword" />
        </template>

        <template v-if="isLogin">
          <div class="options">
            <label class="remember">
              <input type="checkbox" v-model="rememberMe" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
        </template>

        <button class="login-btn" @click="isLogin ? handleLogin() : handleSignUp()">
          {{ isLogin ? 'Login' : 'Create Account' }}
        </button>
      </div>

      <!-- Illustration section -->
      <div class="image-section">
        <img src="/assets/login-illustration.png" alt="Illustration" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLogin = ref(true)
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const rememberMe = ref(false)

function toggleForm() {
  isLogin.value = !isLogin.value
}

async function handleLogin() {
  if (!email.value || !password.value) {
    alert('Please enter email and password.')
    return
  }

  try {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')

    localStorage.setItem('token', data.token)
    router.push('/kanban')
  } catch (err: any) {
    alert('Login error: ' + err.message)
  }
}

async function handleSignUp() {
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    alert('All fields are required.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  try {
    const res = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Signup failed')

    alert('Account created! Please log in.')
    isLogin.value = true
  } catch (err: any) {
    alert('Signup error: ' + err.message)
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #c084fc, #8b5cf6);
  padding: 20px;
}

.box {
  background: white;
  max-width: 1900px;
  width: 100%;
  height: 900px;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.form-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-section h2 {
  margin-bottom: 20px;
  font-size: 120px;
  font-weight: 700;
  color: #4c1d95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.subtext {
  font-size: 30px;
  margin-bottom: 25px;
  color: #555;
}

.subtext a {
  color: #7c3aed;
  font-weight: bold;
  text-decoration: underline;
  font-size: 16px;
}

label {
  font-size: 25px;
  font-weight: 500;
  margin: 12px 0 6px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  padding: 12px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 10px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 20px;
  font-size: 14px;
}

.options a {
  color: #7c3aed;
  text-decoration: none;
  font-size: 14px;
}

.login-btn {
  background-color: #7c3aed;
  color: white;
  border: none;
  padding: 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 25px;
  margin-bottom: 20px;
}

.image-section {
  flex: 1;
  background: #f8f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-section img {
  width: 90%;
  max-width: 400px;
}

.signup-form {
  max-width: 600px;
  height: auto;
  padding: 60px 50px;
}

.signup-form input {
  font-size: 18px;
  padding: 14px;
}

.signup-form h2 {
  font-size: 100px;
}
</style>
