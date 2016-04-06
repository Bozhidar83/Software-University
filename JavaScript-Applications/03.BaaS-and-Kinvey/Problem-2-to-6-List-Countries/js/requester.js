var ajaxRequester = (function () {
    var makeRequest = function (method, url, contentType, data, success, error) {
        $.ajax({
            url: url,
            type: method,
            headers: {
                'Authorization' : 'Basic a2lkX2JKS2pFV0NhUmU6ZGMxNzcyZDYxYWRkNDY0YTgzN2VhZDA3ODMzNDZkNGY=',
                'X-Kinvey-API-Version' : '3'
            },
            contentType: contentType,
            data: JSON.stringify(data) || undefined,
            success: success,
            error: error
        });
    };

    var makeGetRequest = function (url, success, error) {
        return makeRequest('GET', url, 'application/json', undefined, success, error);
    };

    var makePostRequest = function (url, data, success, error) {
        return makeRequest('POST', url, 'application/json', data, success, error);
    };

    var makePutRequest = function (url, data, success, error) {
        return makeRequest('PUT', url, 'application/json', data, success, error);
    };

    var makeDeleteRequest = function (url, success, error) {
        return makeRequest('DELETE', url, null, null, success, error);
    };

    return {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
}());