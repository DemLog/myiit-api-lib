const Auth = require('./authUser.js')
const MyFetch = require('./myFetch/myfetch.js')
const myFetch = MyFetch.myFetch

exports.User = class User {
    constructor(user) {
        this.user = user
    }

    async method(
        name, body = null,
        params = {}, method = 'GET',
        version = 'v1') {

        if (!await this.user.checkTimeOut()) {
            const err = {
                data: null,
                err: {
                    error: ["Ошибка авторизации"]
                }
            }
            return err
        }

        const _url = `https://myiit.demlovesky.ru/api/${version}/${name}`
        const _options = {
            method: method,
            url: _url,
            params: {
                token: this.user.token,
                ...params
            },
            body: body
        }

        const {data, error} = await myFetch(_options)
        if (!data) {
            const err = error.errors
            // console.error(err)
            return {data, err}
        }
        return data

    }

}