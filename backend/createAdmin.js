
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const createAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Creating Admin User');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@kusurimane.com' });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`📧 Email: ${existingAdmin.email}`);
      console.log(`👤 Name: ${existingAdmin.name}`);
      console.log(`🔑 Role: ${existingAdmin.role}\n`);
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@kusurimane.com',
      password: 'Admin@123456', // CHANGE THIS!
      phone: '+919876543210', // CHANGE THIS!
      role: 'admin'
    });

    await admin.save();

    console.log('✅ Admin user created successfully!\n');
    console.log('📋 Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@kusurimane.com');
    console.log('🔒 Password: Admin@123456');
    console.log('📱 Phone: +919876543210');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Please change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();