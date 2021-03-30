class Helper {
    constructor() {}

    getIsoDate() {
        let dt = new Date();
        let tdy_dt = dt.toLocaleDateString();
        dt = dt.toISOString()
        return {
            dt,
            tdy_dt
        }
    }

}

module.exports = Helper