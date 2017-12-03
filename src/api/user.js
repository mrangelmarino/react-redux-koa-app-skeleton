export const login = (formData) => {
  return fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }).then(response => {
    return response.json()
  })
}

export const logout = (id) => {
  return fetch('/api/user/logout', {
    method: 'POST',
    body: JSON.stringify({"id":id}),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(response => {
    return response.json()
  })
}

export const signup = (formData) => {
  return fetch('/api/user/signup', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    return response.json()
  })
}

export const confirmation = (confirmation) => {
  return fetch('/api/user/confirm/' + confirmation, {
    method: 'POST',
    body: JSON.stringify({
      confirmation
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    return response.json()
  })
}

export const resetPasswordCode = (formData) => {
  return fetch('/api/user/reset', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

export const resetPassword = (formData) => {
  return fetch('/api/user/reset/' + formData.resetCode, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}
