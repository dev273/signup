import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const applyDatabaseSetup = async () => {
  await connectDb();
};

export default applyDatabaseSetup;
