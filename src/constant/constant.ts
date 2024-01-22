

export const CONSTANT = {
    GENDER : {
        MALE : 'male',
        FEMALE : 'female'
    },
    STATUS: {
        ACTIVE: 1,
        IN_ACTIVE: 0,
        DELETE: 7,
    },
    APP:{
        PORT: +parseInt(process.env.APP_PORT)  || 3001,
    }
}
