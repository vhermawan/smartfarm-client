import { servicekandangMachine } from "@common/machines/kandang-machine/kandangMachine";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useActor } from "@xstate/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { ValidationFormKandang, schemaFormKandang } from "../constant/schema";
import { useCallback, useEffect } from "react";

const defaultValues = {
  name: '',
  address: '',
  information: '',
}

export default function ModalForm(){
  const [state, dispatch] = useActor(servicekandangMachine);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<ValidationFormKandang>({
    defaultValues,
    resolver: zodResolver(schemaFormKandang)
  });

  const handleResetValue = useCallback(() => {
    setValue('name', '')
    setValue('address', '')
    setValue('information', '')
  },[setValue])

  const handleSubmitData: SubmitHandler<ValidationFormKandang> = (data) => {
    console.log('data',state.matches('modalEditOpen'), state.event)
    if(state.matches('modalEditOpen')){
      dispatch({
        type: 'SUBMIT_EDIT_DATA',
        params: data,
      })
    }else{
      dispatch({
        type: 'SUBMIT_CREATE_DATA',
        params: data,
      })
    }
  }

  useEffect(()=> {
    if(state.matches('modalEditOpen')){
      setValue('name', state.context.params.name)
      setValue('address', state.context.params.address)
      setValue('information', state.context.params.information)
    }else{
      handleResetValue()
    }
  },[state, setValue, handleResetValue])

  return (
    <Modal
      opened={state.context.formModal.isOpen}
      onClose={() => dispatch({
        type:'CLOSE_MODAL_DATA'
      })}
      title={state.context.formModal.title}
      >
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <Controller
            defaultValue=''
            render={({ field: { value, name, onChange } }) => (
              <TextInput 
                label="Nama Kandang" 
                placeholder="Masukan nama kandang..."
                value={value}
                name={name}
                onChange={onChange}
                error={errors?.name?.message}
                required
              />
            )}
            control={control}
            name='name'
          />
          <Controller
            defaultValue=''
            render={({ field: { value, name, onChange } }) => (
              <TextInput 
                mt="md"
                label="Alamat" 
                placeholder="Masukan alamat..."
                value={value}
                name={name}
                onChange={onChange}
                error={errors?.name?.message}
                required
              />
            )}
            control={control}
            name='address'
          />
          <Controller
            defaultValue=''
            render={({ field: { value, name, onChange } }) => (
              <Textarea 
                mt="md" 
                label="Keterangan" 
                placeholder="Masukkan keterangan..." 
                onChange={onChange}
                value={value}
                name={name}
                error={errors?.information?.message}
                required
              />
            )}
            control={control}
            name='information'
          />
          <Group position="right" mt="md">
            <Button type="submit">Simpan data</Button>
          </Group>
        </form>
    </Modal>
  )
}