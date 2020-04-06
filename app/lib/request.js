export const requestGet = ({url}) => request({url, method: 'GET'})

export const requestPost = ({url, payload}) => request({url, payload, method: 'POST'})

const request = ({url, method, payload}) => {
  const serializedPayload = (typeof payload === 'object') ? JSON.stringify(payload) : ''
  const contentTypeHeader = (serializedPayload.length) ? {'Content-Type': 'application/json'} : {}

  return fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      ...contentTypeHeader
    },
    body: serializedPayload
  }).then(response => response.json())
}
