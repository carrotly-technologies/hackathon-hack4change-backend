import { Injectable } from "@nestjs/common";
import { AwardRepository } from "@app/awards/repositories/award.repository";
import { AwardCreateInput } from "@app/awards/inputs/award-create.input";
import { AwardUpdateInput } from "@app/awards/inputs/award-update.input";
import { AwardFindManyInput } from "@app/awards/inputs/award-find-many.input";
import { AwardFindManySortInput } from "@app/awards/inputs/award-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { AwardObject } from "@app/awards/objects/award.object";
import { AwardPaginationResponse } from "@app/awards/responses/award-pagination.response";

@Injectable()
export class AwardService {
  constructor(private readonly awardRepository: AwardRepository) {}

  async create(input: AwardCreateInput): Promise<AwardObject> {
    const award = await this.awardRepository.create(input);
    return new AwardObject(award);
  }

  async findById(id: string): Promise<AwardObject | null> {
    const award = await this.awardRepository.findById(id);
    return award ? new AwardObject(award) : null;
  }

  async findAll(
    input: AwardFindManyInput,
    sort: AwardFindManySortInput,
    pagination: PaginationInput,
  ): Promise<InstanceType<typeof AwardPaginationResponse>> {
    return this.awardRepository.findAll(input, sort, pagination);
  }

  async update(input: AwardUpdateInput): Promise<AwardObject | null> {
    const award = await this.awardRepository.update(input.id, input);
    return award ? new AwardObject(award) : null;
  }

  async delete(id: string): Promise<AwardObject | null> {
    const award = await this.awardRepository.delete(id);
    return award ? new AwardObject(award) : null;
  }
} 