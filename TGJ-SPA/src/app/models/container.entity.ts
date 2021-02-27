export interface Container {
  _id: string;
  type: Type;
}

export interface TextContainer extends Container {
  text: string;
}

export interface TextContainer extends Container {
  image_url: string;
  caption?: string;
}

enum Type {
  Text = 1,
  Image = 2
}
