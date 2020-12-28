/**
 * Created by artem on 9/1/16.
 */
function allowCrossDomain (req, res, next) {
    const origin = req.headers.referer? req.headers.referer.replace(/^(https?:\/\/[^/]+).*/, '$1'): 'http://localhost:3000';
    const methods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'].join(', ');
    const headers = [
        'X-Requested-With',
        'Accept',
        'Origin',
        'Referer',
        'User-Agent',
        'Content-Type',
        'Authorization',
        'jsessionid',
        'token'
    ].join(', ');

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', methods);
    res.header('Access-Control-Allow-Headers', headers);
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
}

exports.allowCrossDomain = allowCrossDomain;