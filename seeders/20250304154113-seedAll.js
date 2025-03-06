'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let users = require('../data/users.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    let userProfiles = require('../data/userProfiles.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    let courses = require('../data/courses.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    let userCourses = require('../data/userCourses.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    let comments = require('../data/comments.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    let courseComments = require('../data/courseComments.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Users', users, {})
    await queryInterface.bulkInsert('UserProfiles', userProfiles, {})
    await queryInterface.bulkInsert('Courses', courses, {})
    await queryInterface.bulkInsert('UserCourses', userCourses, {})
    await queryInterface.bulkInsert('Comments', comments, {})
    await queryInterface.bulkInsert('CourseComments', courseComments, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('UserProfiles', null, {})
    await queryInterface.bulkDelete('Courses', null, {})
    await queryInterface.bulkDelete('UserCourses', null, {})
    await queryInterface.bulkDelete('Comments', null, {})
    await queryInterface.bulkDelete('CourseComments', null, {})
  }
};
