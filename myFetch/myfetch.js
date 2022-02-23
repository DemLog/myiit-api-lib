// Powered by simpleFetch by harryheman
// Especially for the library myIIT-API-Lib

const myFetchCache = new Map()

const myFetch = async (options) => {
    let url = ''

    if (typeof options === 'string') {
        url = options
    } else {
        if (options?.url) {
            url = options.url
        }
    }

    const isSpecialCase =
        url.startsWith('/') ||
        url.startsWith('?') ||
        url.startsWith(':') ||
        url.lastIndexOf('/') === url.length - 1 ||
        url.lastIndexOf('?') === url.length - 1 ||
        url.lastIndexOf(':') === url.length - 1

    if (myFetch.baseUrl) {
        if (!url) {
            url = myFetch.baseUrl
        } else {
            url = isSpecialCase
                ? `${myFetch.baseUrl}${url}`
                : `${myFetch.baseUrl}/${url}`
        }
    }

    if (options?.params) {
        const params = new URLSearchParams(options.params)
        url = `${url}?${decodeURIComponent(params)}`
    }

    url = window.encodeURI(url)
    if (!url) {
        return console.error('URL not provided!')
    }

    let _options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolice: 'no-referrer',
        customCache: false,
    }

    if (typeof options === 'object') {
        _options = {
            ..._options,
            ...options
        }
    }

    if (_options.body && _options.headers['Content-Type'] === 'application/json') {
        _options.body = JSON.stringify(_options.body)
    }

    if (_options.log) {
        console.log(
        `%c Options: ${JSON.stringify(_options, null, 2)}`,
        'color: blue')
    }

    if ((_options.method === 'POST' || _options.method === 'PUT') && !_options.body) {
        console.warn('Body not provided!')
    }

    if (_options.method === 'GET' && _options.customCache && myFetch.has(url)) {
        return myFetchCache.get(url)
    }

    try {
        const response = await fetch(url, _options)

        const {status, statusText} = response

        const info = {
            headers: [...response.headers.entries()].reduce((a, [k, v]) => {
                a[k] = v
                return a
            }, {}),
            status,
            statusText,
            url: response.url
        }

        let data

        const contentTypeHeader = response.headers.get('Content-Type')

        if (contentTypeHeader) {
            if (contentTypeHeader.includes('json')) {
                data = await response.json()
            } else if (contentTypeHeader.includes('text')) {
                data = await response.text()

                if (data.includes('Error!')) {
                    const errorMessage = data
                        .match(/Error:.[^<]+/)[0]
                        .replace('Error:', '')
                        .trim()

                    if (errorMessage) {
                        data = errorMessage
                    }
                }
            } else {
                data = response
            }
        } else {
            data = response
        }

        let result

        if (response.ok) {
            result = { data: data, error: null, info }

            if (_options.method === 'GET') {
                myFetchCache.set(url, result)

                if (_options.log) {
                    console.log(myFetchCache)
                }
            }

            if (_options.log) {
                console.log(
                    `%c Result: ${JSON.stringify(result, null, 2)}`,
                    'color: green'
                )
            }
            return result
        }
        result = {
            data: null,
            error: data,
            info
        }

        if (_options.log) {
            console.log(
                `%c Result: ${JSON.stringify(result, null, 2)}`,
                'color: red'
            )
        }
        return result
    } catch (err) {
        console.error(err)
    }
}

Object.defineProperties(myFetch, {
    baseUrl: {
        value: '',
        writable: true,
        enumerable: true
    },
    authToken: {
        value: '',
        writable: true,
        enumerable: true
    }
})

myFetch.get = (url, options) => {
    if (typeof url === 'string') {
        return myFetch({
            url,
            ...options
        })
    }
    return myFetch({
        ...url
    })
}

myFetch.post = (url, body, options) => {
    if (typeof url === 'string') {
        return myFetch({
            url,
            method: 'POST',
            body,
            ...options
        })
    }
    return myFetch({
        method: 'POST',
        body: url,
        ...body
    })
}

myFetch.update = (url, body, options) => {
    if (typeof url === 'string') {
        return myFetch({
            url,
            method: 'PUT',
            body,
            ...options
        })
    }
    return myFetch({
        method: 'PUT',
        body: url,
        ...body
    })
}

myFetch.remove = (url, options) => {
    if (typeof url === 'string') {
        return myFetch({
            url,
            method: 'DELETE',
            ...options
        })
    }
    return myFetch({
        method: 'DELETE',
        ...url
    })
}

exports.myFetch = myFetch;
exports.myFetch.get = myFetch.get;
exports.myFetch.post = myFetch.post;
exports.myFetch.update = myFetch.update;
exports.myFetch.remove = myFetch.remove;
