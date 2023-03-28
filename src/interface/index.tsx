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

export interface singlePost {
  post: {
    _id: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
  },
  voteList: {
    author: singleUser,
    vote: string,
  }[],
}

export interface singleComment {
  comment: {
    _id: string,
    author : {
      imageUrl: string,
      userName: string,
    },
    content: string,
    createdAt: string,
  },
  voteList: {
    author: singleUser,
    vote: string,
  }[],
}