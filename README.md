# NMG Stack Repository Template

### This is template repo using NMG stack.

- NestJS
- MongoDB
- GraphQL

### While using this template, please make sure to update the following:

- `package.json` - Update the name and description of the project.
- `README.md` - Update it to reflect the project.
- `CODEOWNERS` - Update it to contain developers maintaining the project.
- `.gitlab-ci.yml` - Change path to project
- `src/utils/registerEnums.ts` - delete example module reference
- `src/common/modules/app-mongo-models.module.ts` - delete example schema reference

### Module Creating Convention Guidelines

General guideline for naming files is to use the module name as prefix and type as suffix. For User, if you have a module called `user`, the files should be named as follows:

- `user.module.ts`
- `user.resolver.ts`
- `user.service.ts`
- `user.repository.ts`
- `user.schema.ts`
- `user.input.ts`
- `user-create.input.ts`
- `user.object.ts`

If there are multiple files with the same `type` (i.e. `user.input.ts` and `user-create.input.ts`) they should be put in a folder called `inputs`. If there is only one file of given type it is not necessary to create a folder. I leave it up to you.

All GraphQL types should be names `*.object.ts` and all GraphQL inputs should be named `*.input.ts`.

#### Resolvers

##### Query

Queries should follow this convention `<object><operation>`:

- `user` - gets distinct user by fields provided in input
- `users` - gets all users by fields provided in input

##### Mutation

Mutations should follow this convention `<object><operation>`:

- `userCreate` - creates a new user
- `userUpdate` - updates an existing user
- `userDelete` - deletes an existing user
- `userDeleteMany` - deletes multiple users

##### Pagination and filters

In other projects sometimes those fields are in the same input. In this project approach we are separating them to make it easier read.

```ts
    @Args(INPUT_KEY) input: UserFindManyInput,
    @Args(INPUT_SORT) sort: UserFindManySortInput,
    @Args(INPUT_PAGINATION) pagination: PaginationInput
```

`PaginationInput` - is predefined input, which you can import.

#### Services

Services are responsible for business logic and should not contain any database logic. They should only call the repository methods.

#### Repositories

Repositories are responsible for database logic and should not contain any business logic. They should only call the service methods.

As we are using MongoDB, we are using `mongoose` as ODM. Repositories inject all necessary models and use them to perform CRUD operations.

```ts
constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
```

#### Schemas

Schemas are responsible for defining the database structure.
Unlike Prisma declaring schema is not enough.
We need to import it inside the module. in `src/common/modules/app-mongo-models.module.ts` we are importing all schemas and exporting them.
After that this schema will be available in all modules.

#### Inputs

Inputs are used to define the input types for GraphQL queries and mutations.
They should be named `*.input.ts` and should contain all the fields that are required for the query or mutation.
We are using `graphql-scalars` for custom predefined scalars.

```ts
    @Field(() => GraphQLObjectID)
    id: string;
```

It is better than using `@IsMongoId()` decorator.

#### Objects

Objects are used to define the output types for GraphQL queries and mutations.
They should be named `*.object.ts` and should contain all the fields that are required for the query or mutation.
All objects should have contructor like this:

```ts
    constructor(input: UserDocument | UserObject) {
        Object.assign(this, {
        ...((input as any)._doc
            ? (input as UserDocument).toObject({ virtuals: true })
            : input),
        });
    }
```

This makes sure that when invoking the constructor with a document from the database,
it will be converted to a plain object.
This is important because otherwise we will get an error when trying to access the fields of the object.
Most common error when there would be `id` field in the object, but there is no `id` field in the document.
This is because `id` is a virtual field and it is not present in the document.
So we need to convert the document to a plain object first and then access the fields.

#### Errors

Error file should be named `<entity>-*.error.ts` and should contain just one class. This class must extend one of the base error classes.

- `BusinessError` - for business logic errors
- `ValidationError` - for validation errors
- `AuthenticationError` - for authentication errors
- `NotFoundError` - for not found errors
- `ForbiddenError` - for forbidden errors
- `InternalError` - for internal errors

All can be found in `src/common/errors/business.error.ts` file.

There should be `<entity>.errors.ts` file which will group all error codes which should be put inside `src/utils/registerEnums.ts` - it is done like that to enable frontend to map our error codes to messages.

Structure of individual error file should be like this:

```ts
export const USER_NOT_FOUND_CODE = 'USER_NOT_FOUND_CODE'; // aforementioned code should be put in `src/<module>/errors/<module>.errors.ts` file

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super('User not found', USER_NOT_FOUND_CODE);
  }
}
```
