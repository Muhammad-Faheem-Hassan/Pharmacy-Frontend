export interface IBrand {
  _id: string;
  colorCode: string;
  name: string;
  languages: Array<{
    language: string;
    quantity: number;
    orientation: 'H' | 'V'; // Add orientation property here
  }>;
}