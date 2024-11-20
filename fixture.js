require('dotenv').config()
const bcrypt = require('bcrypt')
const dbConnect = require('./src/db/db.js')
const CourseModel = require('./src/models/course.js')
const UserModel = require('./src/models/user.js');
const BookModel = require('./src/models/book.js');
const { faker } = require('@faker-js/faker');

dbConnect().catch((err) => {
    console.log(err)
})

const numberOfCourse = 100
const numberOfUsers = 100
const numberOfBooks = 100

async function generate() {
    for (let i = 0; i < numberOfCourse; i++) {
        const newCourse = new CourseModel({
            price: faker.commerce.price(),
            title: faker.lorem.sentence(5),
            category: faker.music.genre(),
            author: faker.person.fullName()
        })
        const result = await newCourse.save()
        console.log(`${i} - Course with id: ${result._id} generated`)
    }
    let usersList = []
     let hashedPassword = ""
    let username = ""
    for (let i = 0; i < numberOfUsers; i++) {
        hashedPassword = await bcrypt.hash("123458ABC", 10)
    //    console.log("Pass:"+ hashedPassword)

        username = Date.now()
        let newUser = new UserModel({
            username: username + faker.internet.userName(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            password:hashedPassword,
            confirmPassword: hashedPassword


        })
        const result = await newUser.save()
        usersList.push(result._id)
      //  console.log(`${i} - User with id: ${result._id} generated`)
    }
    for (let i = 0; i < numberOfBooks; i++) {
        const randomId = usersList[Math.floor(Math.random() * usersList.length)]
        const newBook = new BookModel({
            author: randomId,
            description: faker.lorem.paragraph(),
            isbn: faker.lorem.word(),
            title: faker.lorem.sentence({ min: 3, max: 5 }),
            link:faker.commerce.isbn(),
            pub_date:faker.git.commitDate()

        })
        const result = await newBook.save()
        console.log(`${i} - Book with id: ${result._id} generated`)
    }
}
generate()