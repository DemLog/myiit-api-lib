import myFetch from "./myFetch/myfetch";

export default class User {

    constructor(login, password, vkUrl = null) {
        this.login = login
        this.password = password
        this.vkURL = vkUrl
        this.token = null
        this.vkID = null

        myFetch.baseUrl = 'https://myiit.demlovesky.ru/api/v1'
    }

    async loginUser(login = this.login, password = this.password) {
        const body = {
            login,
            password
        }
        const {data, error} = await myFetch.post('auth.loginUser', body)

        if (data) {
            this.token = data.token
            this.vkID = data.vk_id
        } else {
            const err = error.errors
            // console.error(err)
            return [data, err]
        }
        return data
    }

    async loginVK(vkURL = this.vkURL) {
        const {data, error} = await myFetch.get(
            'auth.loginUser',
            {
                params: vkURL
            }
        )

        if (data) {
            this.token = data.token
            this.vkID = data.vk_id
        } else {
            const err = error.errors
            // console.error(err)
            return [data, err]
        }
        return data
    }

    async regUser(vkID = this.vkID, login = this.login, password = this.password) {
        const body = {
            login,
            password,
            vk_id: vkID
        }
        const {data, error} = await myFetch.post('auth.regUser', body)
        if (data) {
            this.token = data.token
            this.vkID = data.vk_id
        } else {
            const err = error.errors
            // console.error(err)
            return [data, err]
        }
        return data
    }
}