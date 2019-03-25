/* dev || test || prod */
const mode = 'dev'

const port = { dev: 8000, test: 8000, prod: 8000 }[mode]
const ip = { dev: undefined, test: '0.0.0.0', prod: '0.0.0.0' }[mode]
const frontBaseUrl = { dev: 'http://localhost:8085', test: 'http://5.63.153.57:8085', prod: 'http://red-cat-shop.ru' }[
    mode
]

const dbLink = {
    dev: 'mongodb+srv://root:Y0RJeop1EZUBt2Ia@cluster0-pw6v3.mongodb.net/dev_RED_CAT_STORE',
    test: 'mongodb+srv://root:Y0RJeop1EZUBt2Ia@cluster0-pw6v3.mongodb.net/dev_RED_CAT_STORE',
    prod: 'mongodb://localhost:27017/RED_CAT_STORE',
}[mode]

const yakassa = {
    shopid: '559936',
    secret: 'test_hLM0ihBOu7z6lGiUkRCk3CQgdpxD_zGIm45vjQlpy1M',
}

const cloudinary = {
    dev: {
        cloud_name: 'dlverzrqn',
        api_key: '745482417913826',
        api_secret: '76JNeFyTDX-LaXQHa4XxUtUE2Ko',
    },
    test: {
        cloud_name: 'dlverzrqn',
        api_key: '745482417913826',
        api_secret: '76JNeFyTDX-LaXQHa4XxUtUE2Ko',
    },
    prod: {
        cloud_name: 'dlverzrqn',
        api_key: '745482417913826',
        api_secret: '76JNeFyTDX-LaXQHa4XxUtUE2Ko',
    },
}[mode]

const isDev = mode === 'dev'

const cfg = {
    isDev,
    cloudinary,
    yakassa,
    server: { frontBaseUrl, port, ip },
    mongoDb: { link: dbLink },
    tokenKey: 'pZ48qqf6M4GY82d5PfzDHRVsqqWdCXDdbA8SGUdqGNYaZ9En',
    secret: 'pZ48qqf6M4GY82d5GNYaZ9En9BpQzbrmTkPqP9rzSALvBfa9',

    nodemailer: {
        // TODO: prod account for nodemailer
        user: 'nodemailer.test.dev@gmail.com',
        pass: 'joxy_is_awsome',
    },
    std_express: {
        customer: 'test',
        key: '732h384',
    },

    defaultAdmin: {
        DEF_ADMIN_EMAIL: 'danis.sliceplanet@gmail.com',
        DEF_ADMIN_PASS: 'super',
        DEF_ADMIN_NAME: 'Admin',
    },
}

module.exports = cfg

/**

pshin@mail.ru

development:
  cloud_name: dlverzrqn
  api_key: '745482417913826'
  api_secret: 76JNeFyTDX-LaXQHa4XxUtUE2Ko
  enhance_image_tag: true
  static_file_support: false
production:
  cloud_name: dlverzrqn
  api_key: '745482417913826'
  api_secret: 76JNeFyTDX-LaXQHa4XxUtUE2Ko
  enhance_image_tag: true
  static_file_support: true
test:
  cloud_name: dlverzrqn
  api_key: '745482417913826'
  api_secret: 76JNeFyTDX-LaXQHa4XxUtUE2Ko
  enhance_image_tag: true
  static_file_support: false


danis sliceplanet cloudinary

{
  cloud_name: 'dxpzlv2dj',
  api_key: '687383323777422',
  api_secret: 'A8CK1UmRPP0PuBKQqVKWJUD1mug',
}

*/
