import { Injectable } from "@nestjs/common";
import { UserRepository } from "@app/user/repositories/user.repository";
import { UserCreateInput } from "@app/user/inputs/user-create.input";
import { UserUpdateInput } from "@app/user/inputs/user-update.input";
import { UserFindManyInput } from "@app/user/inputs/user-find-many.input";
import { UserFindManySortInput } from "@app/user/inputs/user-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { UserObject } from "@app/user/objects/user.object";
import { UserPaginationResponse } from "@app/user/responses/user-pagination.response";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(input: UserCreateInput): Promise<UserObject> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const user = await this.userRepository.create(input);
    return new UserObject(user);
  }

  async findById(id: string): Promise<UserObject | null> {
    const user = await this.userRepository.findById(id);
    return user ? new UserObject(user) : null;
  }

  async findByEmail(email: string): Promise<UserObject | null> {
    const user = await this.userRepository.findByEmail(email);
    return user ? new UserObject(user) : null;
  }

  async findAll(
    input: UserFindManyInput,
    sort: UserFindManySortInput,
    pagination: PaginationInput,
  ): Promise<InstanceType<typeof UserPaginationResponse>> {
    return this.userRepository.findAll(input, sort, pagination);
  }

  async update(input: UserUpdateInput): Promise<UserObject | null> {
    if (input.email) {
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser && existingUser._id.toString() !== input.id) {
        throw new Error("User with this email already exists");
      }
    }
    const user = await this.userRepository.update(input.id, input);
    return user ? new UserObject(user) : null;
  }

  async delete(id: string): Promise<UserObject | null> {
    const user = await this.userRepository.delete(id);
    return user ? new UserObject(user) : null;
  }
}
