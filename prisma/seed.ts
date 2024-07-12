import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

;(async () => {
  // Create users
  const users = []
  for (let i = 0; i < 5000; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: `${faker.internet.email()}-${i}`,
        image: faker.image.avatar()
      }
    })
    users.push(user)
  }

  // Create posts
  const posts = []
  for (let i = 0; i < 1000; i++) {
    const post = await prisma.post.create({
      data: {
        desc: faker.lorem.paragraph(),
        userId: users[Math.floor(Math.random() * users.length)].id
      }
    })
    posts.push(post)
  }

  // Create likes
  for (let i = 0; i < 500; i++) {
    await prisma.like.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        postId: posts[Math.floor(Math.random() * posts.length)].id
      }
    })
  }

  // Create accounts (for GitHub Auth)
  for (const user of users) {
    await prisma.account.create({
      data: {
        userId: user.id,
        type: 'oauth',
        provider: 'github',
        providerAccountId: faker.string.uuid(),
        refresh_token: faker.string.alphanumeric(64),
        access_token: faker.string.alphanumeric(64),
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'Bearer',
        scope: 'read:user user:email'
      }
    })
  }

  // Create sessions
  for (const user of users) {
    await prisma.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        sessionToken: faker.string.alphanumeric(32)
      }
    })
  }
})()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
