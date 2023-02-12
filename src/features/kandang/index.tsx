import Layout from "@components/Layouts/Layout";
import { ActionIcon, Box, Button, Flex, Group, Text, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import employees from '../../data/example.json';
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons";
import { useActor } from "@xstate/react";
import { servicekandangMachine } from "@common/machines/kandang-machine/kandangMachine";
import ModalForm from "./component/ModalForm";

const PAGE_SIZE = 15;

export default function Kandang(){
  const [state, dispatch] = useActor(servicekandangMachine);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(employees.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(employees.slice(from, to));
  }, [page]);

  useEffect(()=> {
    dispatch({
      type: 'FETCHING_DATA',
    })
  },[dispatch])

  console.log('state', state)
  
  return (
    <Layout>
      <Flex style={{marginBottom:'20px'}} wrap="wrap" justify="space-between">
        <Title order={3} weight={100}>Kandang</Title>
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
      <Box sx={{ height: 300 }}>
      <DataTable
        withBorder
        records={records}
        columns={[
          { accessor: 'Nama' },
          { accessor: 'Alamat' },
          { accessor: 'Keterangan' },
          {
            accessor: 'actions',
            title: <Text>Aksi</Text>,
            textAlignment: 'center',
            width: 110,
            render: (company) => (
              <Group spacing={4} position="right" noWrap>
                <ActionIcon color="green" onClick={() => console.log('detail')}>
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
        totalRecords={employees.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />
      </Box>
      <ModalForm />
    </Layout>
  )
}