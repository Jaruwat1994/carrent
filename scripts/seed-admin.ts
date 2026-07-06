import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { Admin } from '../src/lib/models/Admin'

async function seedAdmin() {
  const uri = process.env.MONGODB_URI
  if (!uri) { console.error('MONGODB_URI not found'); process.exit(1) }

  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  const email = 'admin@carrent.com'
  const existing = await Admin.findOne({ email })
  if (existing) {
    console.log('Admin already exists:', email)
    await mongoose.disconnect()
    process.exit(0)
  }

  const password = await bcrypt.hash('Admin@1234', 12)
  await Admin.create({ email, password, name: 'Super Admin', role: 'superadmin' })
  console.log('✅ Admin created successfully')
  console.log('   Email:', email)
  console.log('   Password: Admin@1234')

  await mongoose.disconnect()
  process.exit(0)
}

seedAdmin().catch(err => { console.error(err); process.exit(1) })
