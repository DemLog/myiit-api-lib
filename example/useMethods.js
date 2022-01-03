import { AuthUser, User } from 'myiit-api-lib'

const authUser = new AuthUser('e-mail', 'password')
const user = new User(authUser)

const getMethod = () => { // for 'GET', 'DELETE'
    const data = async () => {
        const news = await user.method('news.getListArticle', null, {}, 'GET', 'v1') // name_method: string; body: object; params: object; method_http: string; ver_api: string
        return news
    }
    data()
    return data
}

const getMethodID = () => {
    const data = async () => {
        const params = {
            "id": 1
        }
        const news = await user.method('news.getArticle', null, params, 'GET', 'v1') // name_method: string; body: object; params: object; method_http: string; ver_api: string
        return news
    }
    data()
    return data
}

const postMethod = () => { // for 'POST', 'UPDATE'
    const data = async () => {
        const body = {
            "name": "test",
            "slug": "test"
        }
        const news = await user.method('news.createCategory', body, {}, 'POST', 'v1') // name_method: string; body: object; params: object; method_http: string; ver_api: string
        return news
    }
    data()
    return data
}