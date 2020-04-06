export const requestGet = ({url, bearerToken}) => request({url, bearerToken, method: 'GET'})

export const requestPost = ({url, payload, bearerToken}) => request({url, payload, bearerToken, method: 'POST'})

const request = ({url, payload, bearerToken, method}) => {
  const serializedPayload = (typeof payload === 'object') ? JSON.stringify(payload) : ''
  const contentTypeHeader = (serializedPayload.length) ? {'Content-Type': 'application/json'} : {}
  const bearerTokenHeader = (typeof bearerToken === 'string') ? {'Authorization': `Bearer ${bearerToken}`} : {}

  return fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      ...contentTypeHeader,
      ...bearerTokenHeader
    },
    body: serializedPayload
  }).then(response => response.json())
}
