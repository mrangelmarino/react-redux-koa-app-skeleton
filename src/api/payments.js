export const subscribe = token => {
  return fetch('/api/payments', {
    'method': 'POST',
    'body': JSON.stringify(token),
    'headers': {
      'Content-Type': 'application/json'
    },
    'credentials': 'include'
  }).then(response => response.json())
}