const { Activity } = require('../db')

const postActivity = async (name, dificulty, duration, season, countries) => {

    if (!countries) throw Error('You Must Provide a Country')

    if (![name, dificulty, duration, season].every(Boolean)) throw Error('Missing data')

    name = name.trim().toLowerCase();
    duration = duration.trim().toLowerCase();

    countries = Array.isArray(countries) ? countries : [countries];

    const [newActivity, created] = await Activity.findOrCreate({
        where: {
            name,
            dificulty,
            season,
            duration
        }
    })

    if (created) {
        await newActivity.addCountries(countries);
    }

    return newActivity

}

module.exports = {
    postActivity
}