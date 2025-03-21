export type LoginType = {
  email: string;
  password: string;
  remember_me?: boolean | undefined;
};

export interface ProviderProps {
  user: string | null;
  token: string;
  login(data: LoginType): void;
  logout(): void;
}

export interface ArticleProps {
  id: number;
  title: string;
  author: string;
  posted: Date;
  lastEdited: Date;
  likes: number;
  content: string;
}

export interface ArticleDTOProps {
  id: number;
  title: string;
  description: string;
}

export interface ArticleCardDTOProps {
  id: number;
  title: string;
  description: string;
  type: string;
  colorCodeOne: string;
  coloCodeTwo: string;
}
