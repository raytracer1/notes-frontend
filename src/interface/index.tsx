export interface Gender {
  value: string,
};

export interface Country {
  value: string,
};

export interface singleUser {
  email: string,
  userName: string,
  gender: string,
  country: string,
  imageUrl: string,
  timeStamp: string,
  interests: string[],
};

export interface singleSpace {
  _id: string,
  name: string,
  description: string,
  imageUrl: string,
  prerequisites: string[],
  keywords: string[],
  createdAt: string,
  updatedAt: string,
  author: singleUser,
}
