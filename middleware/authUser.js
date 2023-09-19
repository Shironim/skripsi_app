export default defineNuxtRouteMiddleware(() => {
  // const token = localStorage.getItem('token')
  const token = useCookie('token')
  // console.log('token dari auth', token.value)
  // if token is not set, redirect to login page
  if (!token.value) {
    return navigateTo('/login')
  }
})
