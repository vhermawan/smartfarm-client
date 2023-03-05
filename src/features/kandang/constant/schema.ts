import { z } from "zod";

export const schemaFormKandang = z.object({
  address: z.string({
    required_error: "Alamat Kandang tidak boleh kosong",
    invalid_type_error:"Alamat Kandang harus diisi dengan karakter alphabet"
  }),
  name:z.string({
    required_error: "Nama Kandang tidak boleh kosong",
    invalid_type_error:"Nama Kandang harus diisi dengan karakter alphabet"
  }),
  information:z.string({
    required_error: "Keterangan tidak boleh kosong",
    invalid_type_error:"Keterangan harus diisi dengan karakter alphabet"
  }),
}).required();

export type ValidationFormKandang = z.infer<typeof schemaFormKandang>;