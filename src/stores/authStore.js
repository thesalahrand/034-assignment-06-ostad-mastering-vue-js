import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

const EMAIL_ALREADY_EXISTS_ERR_MSG = 'Email already exists'
const PASSWORDS_NOT_MATCHED_ERR_MSG = 'Passwords do not match'
const INVALID_CREDENTIALS_ERR_MSG = 'Invalid credentials'

const getUsers = () => {
  return JSON.parse(localStorage.getItem('users')) || []
}

const updateUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users))
}

const getLoggedInUser = () => {
  const users = getUsers()

  return users.find((user) => user.isLoggedIn)
}

const emailAlreadyExists = (email) => {
  const users = getUsers()

  return users.findIndex((user) => user.email === email) !== -1
}

const passwordMatched = (password, confirmPassword) => {
  return password === confirmPassword
}

export const useAuthStore = defineStore('auth', () => {
  const page = ref('login')
  const loggedInUser = reactive(getLoggedInUser() || {})

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const loginErrMsg = ref('')

  const emailAlreadyExistsErrMsg = computed(() => {
    return emailAlreadyExists(email.value) ? EMAIL_ALREADY_EXISTS_ERR_MSG : ''
  })

  const passwordsNotMatchedErrMsg = computed(() => {
    return !passwordMatched(password.value, confirmPassword.value)
      ? PASSWORDS_NOT_MATCHED_ERR_MSG
      : ''
  })

  const reset = () => {
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    loginErrMsg.value = ''
  }

  const setPage = (newPage) => {
    page.value = newPage
  }

  const init = () => {
    Object.assign(loggedInUser, getLoggedInUser() || {})
  }

  const register = () => {
    if (emailAlreadyExists(email.value) || !passwordMatched(password.value, confirmPassword.value))
      return

    const users = getUsers()
    const usersNew = users.map((user) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      isLoggedIn: false
    }))
    usersNew.push({
      name: name.value,
      email: email.value,
      password: password.value,
      isLoggedIn: true
    })

    updateUsers(usersNew)
    Object.assign(loggedInUser, getLoggedInUser())
    setPage('dashboard')
  }

  const login = () => {
    const users = getUsers()

    const loggedInUser = users.find(
      (user) => user.email === email.value && user.password === password.value
    )

    if (!loggedInUser) {
      loginErrMsg.value = INVALID_CREDENTIALS_ERR_MSG
      return
    }

    loggedInUser.isLoggedIn = true
    loginErrMsg.value = ''
    updateUsers(users)
    Object.assign(loggedInUser, getLoggedInUser())
    setPage('dashboard')
  }

  const logout = () => {
    const users = getUsers()
    const usersNew = users.map((user) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      isLoggedIn: false
    }))

    updateUsers(usersNew)
    Object.assign(loggedInUser, {})
    setPage('login')
  }

  return {
    name,
    email,
    password,
    confirmPassword,
    page,
    setPage,
    loggedInUser,
    loginErrMsg,
    emailAlreadyExistsErrMsg,
    passwordsNotMatchedErrMsg,
    init,
    reset,
    register,
    login,
    logout
  }
})
