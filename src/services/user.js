import { post, patch, get } from '_services/requests'

export const login = payload => post(['login'], { transformPayload: true }, payload)

export const update = (key, payload) => {
  if (payload.picture) {
    const picture = new FormData()
    Object.values(payload).forEach(value => picture.append('picture', value))
    return patch(['user'], { key }, picture)
  }
  return patch(['user'], { transformPayload: true, key }, payload)
}

export const getUser = key => get(['user'], { transformPayload: true, key })
