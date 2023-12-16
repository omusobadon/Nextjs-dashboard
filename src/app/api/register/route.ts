import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const POST = async (request: any) => {
  const { username, password } = await request.json();

  // 既存のユーザーをチェック
  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUser) {
    return new NextResponse('Email is already in use', { status: 400 });
  }

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 5);

  // 新しいユーザーを作成
  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return new NextResponse('User is registered', { status: 200 });
  } catch (err) {
    return new NextResponse('Error registering new user', { status: 500 });
  }
};
