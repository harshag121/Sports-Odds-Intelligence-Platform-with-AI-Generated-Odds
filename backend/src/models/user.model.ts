import { compareSync, hashSync } from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import { users } from '../data/sampleData.js';

export const userModel = {
  findByEmail(email: string) {
    return users.find((user) => user.email === email);
  },
  create(payload: { email: string; username: string; password: string }) {
    const user = {
      id: randomUUID(),
      email: payload.email,
      username: payload.username,
      passwordHash: hashSync(payload.password, 10),
    };

    users.push(user);
    return user;
  },
  verifyPassword(password: string, passwordHash: string) {
    return compareSync(password, passwordHash);
  },
};
