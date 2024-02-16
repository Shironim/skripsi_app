export default defineNuxtRouteMiddleware(() => {
  // const token = localStorage.getItem('token')
  const token = useCookie('token')
  // if token is not set, redirect to login page
  if (!token.value) {
    return navigateTo('/login')
  }
})
