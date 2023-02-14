export type KandangModal = {
  isOpen : boolean;
}

export type Kandang = {
  name: string;
  address: string;
  information: string;
  pemilik: string;
  created_at: Date;
}

export type ListKandang = {
  size: number;
  cages: Kandang[];
}