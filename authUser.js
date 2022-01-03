const MyFetch = require('./myFetch/myfetch.js')
const myFetch = MyFetch.myFetch

exports.AuthUser = class AuthUser {

    constructor(login, password, vkUrl = null) {
        this.login = login
        this.password = password
        this.vkURL = vkUrl
        this.token = null
        this.vkID = null
        this.urlAPI = 'https://myiit.demlovesky.ru/api/v1/'
        this.timeout = 0
    }

    async loginUser(login = this.login, password = this.password) {
        const body = {
            login,
            password
        }
        const {data, error} = await myFetch.post(`${this.urlAPI}auth.loginUser`, body)

        if (data) {
            this.token = data.token
            this.vkID = data.vk_id
            this.timeout = Date.now()
        } else {
            const err = error.errors
            // console.error(err)
            return {data, err}
        }
        return data
    }

    async loginVK(vkURL = this.vkURL) {
        const {data, error} = await myFetch.get(
            `${this.urlAPI}auth.loginUser`,
            {
                params: vkURL
            }
        )

        if (data) {
            this.token = data.token
            this.vkID = data.vk_id
            this.timeout = Date.now()
        } else {
            const err = error.errors
            // console.error(err)
            return {data, err}
        }
        return data
    }

    async regUser(vkID = this.vkID, login = this.login, password = this.password) {
        const body = {
            login,
            password,
            vk_id: vkID
        }
        const {data, error} = await myFetch.post(`${this.urlAPI}auth.regUser`, body)
        if (data) {
            this.token = data.token
            this.vkID = data.vk_id
            this.timeout = Date.now()
        } else {
            const err = error.errors
            // console.error(err)
            return {data, err}
        }
        return data
    }

    async checkTimeOut() {
        const diffTime = Date.now() - this.timeout
        console.log(diffTime)
        if (diffTime >= 3600000) {
            if (this.vkURL) {
                const response = await this.loginVK()
                return !response?.err;

            } else if (this.login && this.password) {
                const response = await this.loginUser()
                return !response?.err;

            } else return false
        } else return true
    }
}