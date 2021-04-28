function createMockDatabase(): IDatabase {
  const data: Data = {
    auth: {},
    user: {},
  };

  function createCollection<Key extends keyof Data>(
    key: Key
  ): ICollection<Key> {
    let nextId = 0;
    return {
      // @ts-ignore
      getById: (id) => {
        // @ts-ignore
        return Promise.resolve(data[key][id]);
      },
      find: (filterBy) => {
        return Promise.resolve(
          Object.values(data[key]).filter((val) => {
            const withFilter = Object.assign({}, val, filterBy);
            return JSON.stringify(val) === JSON.stringify(withFilter);
          })
        );
      },
      create: (input) => {
        const id = nextId++;
        const newItem = { ...input, id };
        Object.assign(data[key], { [id]: newItem });

        return Promise.resolve(newItem);
      },
      // @ts-ignore
      update: (id, updates) => {
        const curr = data[key][id];
        // @ts-ignore
        const updated: Model<DataMappings[Key]> = { ...curr, ...updates };
        Object.assign(data[key], { [id]: updated });

        return updated;
      },
    };
  }

  const collections: { [Key in keyof DataMappings]: ICollection<Key> } = {
    auth: createCollection('auth'),
    user: createCollection('user'),
  };

  return {
    collection<K extends keyof DataMappings>(name: K): ICollection<K> {
      // @ts-ignore
      return collections[name];
    },
  };
}

export default createMockDatabase;
