'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('main')

Route.get('/login', 'UserController.renderLogin')
Route.post('/login', 'UserController.login')
Route.get('/register', 'UserController.renderRegistration')
Route.post('/register', 'UserController.register')

Route.get('/logout', 'UserController.logout');

Route.get('/apply', 'CourseController.renderApplicationSite')
Route.post('/apply', 'CourseController.applyForCourse')

Route.get('/userCourses', 'CourseController.renderUserCourses')
Route.post('/abandon', 'CourseController.abandonCourse')
