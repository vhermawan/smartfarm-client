export type KandangModal = {
  title: string;
  isOpen : boolean;
}

export type FormDeleteModal = {
  isOpen: boolean;
}

export type Kandang = {
  id_cages: number;
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