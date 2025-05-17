import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) {
    // User with this email does not exist
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // Password does not match
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
  // Credentials are valid, allow login
  return NextResponse.json({ user: { email: user.email, id: user._id } });
}
