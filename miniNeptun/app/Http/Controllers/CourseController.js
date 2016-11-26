'use strict'

const Application = use('App/Model/Application')
const Course = use('App/Model/Course')
const Validator = use('Validator')
const Database = use('Database')

class CourseController {

    *renderApplicationSite(req, res) {
        const user_id = yield req.session.get('adonis-auth');

        const applications = yield Application.query().where('user_id', user_id)
        let applicationIds = []

        for (var application of applications) {
            Object.keys(application).map(key => {
                if (key === 'course_id') {
                    applicationIds.push(application[key]);
                }
            })
        }

        const appliedCourses = yield Database.from('courses').whereIn('id', applicationIds)
        const unappliedCourses = yield Database.from('courses').whereNotIn('id', applicationIds);

        yield res.sendView('apply', { appliedCourses, unappliedCourses })
    }
}

module.exports = CourseController
