import Layout from "@components/Layouts/Layout";
import { ActionIcon, Breadcrumbs, Button, Flex, Group, Text, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons";
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
        <Button leftIcon={<IconPlus/>} 
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
            width: 110,
            render: (data) => (
              <Group spacing={4} position="right" noWrap>
                <ActionIcon color="green" onClick={() => console.log('detail',data)}>
                  <IconEye size={16} />
                </ActionIcon>
                <ActionIcon color="blue" onClick={() => console.log('edit')}>
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => console.log('delete')}>
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
    </Layout>
  )
}