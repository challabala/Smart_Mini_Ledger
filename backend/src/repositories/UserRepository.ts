import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data
    });
  }
}

export const userRepository = new UserRepository();
