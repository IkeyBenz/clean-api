import createMockDatabase from './BuildMockDatabase';

const mockUser: User = {
  username: 'ikey',
  email: 'ikey.benz@gmail.com',
};

describe('MockDatabase Tests', () => {
  let mockDb: IDatabase;
  beforeEach(() => {
    mockDb = createMockDatabase();
  });

  describe('collection.create', () => {
    it('adds the input item to collection data', async () => {
      const userId = await mockDb
        .collection('user')
        .create(mockUser)
        .then((user) => user.id);

      expect(userId).toBe(0);
    });
  });

  describe('collection.findById', () => {
    it('returns the correct resource', async () => {
      const user = await mockDb.collection('user').create(mockUser);
      const userModel = await mockDb.collection('user').getById(user.id);

      expect(user).toStrictEqual(userModel);
    });
  });

  describe('collection.update', () => {
    it('properly updates the resource', async () => {
      const user = await mockDb.collection('user').create(mockUser);
      await mockDb.collection('user').update(user.id, { username: 'not ikey' });
      const updated = await mockDb.collection('user').getById(user.id);

      expect(updated).toStrictEqual({ ...user, username: 'not ikey' });
    });
  });

  describe('collection.find', () => {
    it('only returns resources that match the filter', async () => {
      const user1 = await mockDb.collection('user').create({
        username: 'pedro',
        email: '',
      });

      await mockDb.collection('user').create({
        username: 'philip',
        email: '',
      });

      const user3 = await mockDb.collection('user').create({
        username: 'pedro',
        email: '',
      });

      const found = await mockDb.collection('user').find({ username: 'pedro' });
      expect(found).toStrictEqual([user1, user3]);
    });
  });
});
