export const useIsLoggedIn = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    if(authToken === null){
        history.push('/login')
    }
}

export const useCheckToken = () => {
    const authToken = localStorage.getItem('AuthToken');
    return authToken ? true : false
}

export const useGetTokenFromLocalStorage = () => {
    const authToken = localStorage.getItem('AuthToken')
    return authToken
}