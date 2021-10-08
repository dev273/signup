import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const seedAdmin = async () => {
  const adminName = process.env.DEFAULT_ADMIN_NAME;
  const adminEmail = process.env.DETAULT_ADMIN_EMAIL;
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);
    await User.create({
      name: adminName,
      email: adminEmail,
      password: passwordHash,
      role: 'admin',
    });
  }
};

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const applyDatabaseSetup = async () => {
  await connectDb();
  await seedAdmin();
};

export default applyDatabaseSetup;
