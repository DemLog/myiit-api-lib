import { AuthUser, User } from 'myiit-api-lib'

const regUser = () => {
    const authUser = new AuthUser('e-mail', 'password')
    const data = authUser.regUser(1234567) // VK_ID number
    return data // return's variable {vk_id: number, token: string}
}

const loginUser = () => {
    const authUser = new AuthUser('e-mail', 'password')
    const data = authUser.loginUser()
    return data // return's variable {vk_id: number, token: string}
}