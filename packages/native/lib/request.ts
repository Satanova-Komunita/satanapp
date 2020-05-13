interface GetArgs {
  url: string,
  bearerToken?: string
}

interface PostArgs extends GetArgs {
  payload?: any
}

interface RequestArgs extends PostArgs {
  method: 'GET'|'POST'
}

export const requestGet = ({url, bearerToken}: GetArgs) => request({url, bearerToken, method: 'GET'})

export const requestPost = ({url, payload, bearerToken}: PostArgs) => request({url, payload, bearerToken, method: 'POST'})

const request = ({url, payload, bearerToken, method}: RequestArgs) => {
  const serializedPayload = (typeof payload === 'object') ? JSON.stringify(payload) : ''
  const contentTypeHeader = (serializedPayload.length) ? {'Content-Type': 'application/json'} : {}
  const bearerTokenHeader = (typeof bearerToken === 'string') ? {'Authorization': `Bearer ${bearerToken}`} : {}
  const headers: any = {
    Accept: 'application/json',
    ...contentTypeHeader,
    ...bearerTokenHeader
  }

  return fetch(url, {
    method: method,
    body: serializedPayload,
    headers
  }).then(response => response.json())
}
