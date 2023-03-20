export interface UserToSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserToLogin {
  email: string;
  password: string;
}

export interface PlaceholderLookup {
  'First Name': string;
  'Last Name': string;
  'Email': string;
  'Password': string;
}

export interface CodeSnippet {
  'id': number;
  'user_id': number;
  'code': string;
  'title': string;
  'language': string;
  'public': boolean;
}
export interface CodeSnippetToCreate {
  'user_id': number;
  'code': string;
  'title': string;
  'language': string;
  'public': boolean;
}
