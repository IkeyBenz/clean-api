type ICollection<Key> = {
  getById(id: ID): Promise<DataMappings[Key]>;
  find(by: Partial<DataMappings[Key]>): Promise<Model<DataMappings[Key]>[]>;
  create(input: DataMappings[Key]): Promise<Model<DataMappings[Key]>>;
  update(
    id: ID,
    updates: Partial<DataMappings[Key]>
  ): Promise<Model<DataMappings[Key]>>;
};

type DataMappings = {
  auth: AuthCredentials;
  user: User;
};

type CollectionName = keyof DataMappings;

type Data = {
  [K in keyof DataMappings]: { [id: number]: Model<DataMappings[K]> };
};

declare interface IDatabase {
  collection<K extends keyof DataMappings>(name: K): ICollection<K>;
}

type ModelProps = {
  id: ID;
};
type Model<T> = T & ModelProps;

type ID = number;
