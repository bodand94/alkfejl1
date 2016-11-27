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

    *applyForCourse(req,res){
        const applicationData = req.all();

        const application = new Application
        application.course_id = applicationData.course_id
        application.user_id = yield req.session.get('adonis-auth')

        yield application.save();

        yield res.redirect('/apply')
    }

    *renderUserCourses(req,res){
        const user_id = yield req.session.get('adonis-auth')
        const applications = yield Application.query().where('user_id', user_id)
        let applicationIds = []

        for (var application of applications) {
            Object.keys(application).map(key => {
                if (key === 'course_id') {
                    applicationIds.push(application[key]);
                }
            })
        }

        const courses = yield Course.query().whereIn('id', applicationIds)

        yield res.sendView('userCourses', {courses})
    }

    *abandonCourse(req,res){
        const course_id = req.input('course_id')
        const user_id = yield req.session.get('adonis-auth')
        const application = yield Application.query().where('user_id', user_id).where('course_id', course_id).first()
        yield application.delete();

        yield res.redirect('/userCourses');
    }
}

module.exports = CourseController
