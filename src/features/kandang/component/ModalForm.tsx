import { servicekandangMachine } from "@common/machines/kandang-machine/kandangMachine";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useActor } from "@xstate/react";
import { useForm } from '@mantine/form';

export default function ModalForm(){
  const [state, dispatch] = useActor(servicekandangMachine);
  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      information: '',
    },
  });
  return (
    <Modal
      opened={state.context.createModal.isOpen}
      onClose={() => dispatch({
        type:'CLOSE_MODAL_CREATE_DATA'
      })}
      title="Tambah Kandang"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput label="Nama Kandang" placeholder="Masukan nama kandang..." {...form.getInputProps('name')} required/>
          <TextInput mt="md" label="Alamat" placeholder="Masukkan alamat..." {...form.getInputProps('address')} required/>
          <Textarea mt="md" label="Keterangan" placeholder="Masukkan keterangan..." {...form.getInputProps('information')} required/>
          <Group position="right" mt="md">
            <Button type="submit">Simpan data</Button>
          </Group>
        </form>
    </Modal>
  )
}