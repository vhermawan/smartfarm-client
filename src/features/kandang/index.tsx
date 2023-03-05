import Layout from "@components/Layouts/Layout";
import { ActionIcon, Breadcrumbs, Button, Flex, Group, Modal, Text, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons";
import { useActor } from "@xstate/react";
import { servicekandangMachine } from "@common/machines/kandang-machine/kandangMachine";
import ModalForm from "./component/ModalForm";
import { BREADCUMB } from "./constant";

const PAGE_SIZE = 10;

export default function Kandang(){
  const [state, dispatch] = useActor(servicekandangMachine);
  const [page, setPage] = useState(1);

  useEffect(()=> {
    dispatch({
      type: 'FETCHING_DATA',
    })
  },[dispatch])
  
  return (
    <Layout>
      <Breadcrumbs>{BREADCUMB}</Breadcrumbs>
      <Flex style={{marginBottom:'20px', marginTop:'10px'}} wrap="wrap" justify="space-between">
        <Title order={2}>Kandang</Title>
        <Button type="button" leftIcon={<IconPlus/>} 
          onClick={()=>
            dispatch({
              type:'OPEN_MODAL_CREATE_DATA'
            })
          }
        >
          Tambah Kandang
        </Button>
      </Flex>
      <DataTable
        withBorder
        records={state.context.data.cages}
        columns={[
          { accessor: 'name', title: 'Nama kandang' },
          { accessor: 'address', title: 'Alamat' },
          { accessor: 'information', title: 'Keterangan' },
          { accessor: 'pemilik', title: 'Pemilik' },
          {
            accessor: 'actions',
            title: <Text>Aksi</Text>,
            textAlignment: 'center',
            width: 80,
            render: (data) => (
              <Group spacing={4} position="right" noWrap>
                <ActionIcon color="blue" onClick={() => 
                  dispatch({
                    type:'OPEN_MODAL_EDIT_DATA',
                    params: {
                      name: data.name,
                      address: data.address,
                      information: data.information,
                    },
                    id: data.id_cages,
                  })}
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() =>{
                    dispatch({
                      type:'OPEN_MODAL_DELETE_DATA',
                      id: data.id_cages,
                    })
                  }
                }>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        totalRecords={state.context.data.size}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        fetching={state.context.loading}
      />
      <ModalForm />
      <Modal 
        opened={state.context.formDelete.isOpen} 
        withCloseButton 
        onClose={()=>
          dispatch({
            type:'CLOSE_MODAL_DATA'
          })
        } 
        size="sm" 
        radius="md"
        title='Konfirmasi hapus data'
      >
        <Text size="sm" mb="sm" weight={500}>
          Apakah yakin ingin menghapus data ini?
        </Text>

        <Group align="flex-end">
          <Button 
            color="red"
            onClick={()=>
              dispatch({
                type:'SUBMIT_DELETE_DATA'
              })
            }>
            Hapus
          </Button>
        </Group>
      </Modal>
    </Layout>
  )
}