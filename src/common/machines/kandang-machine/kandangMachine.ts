import { assign, createMachine, interpret } from 'xstate';
import { FormDeleteModal, Kandang, KandangModal, ListKandang } from '@features/kandang/types';
import { deleteDataKandang, getDataKandang, postDataKandang, putDataKandang } from '@common/services/kandangService';
import { Toast } from '@common/helpers/toast';
import { ValidationFormKandang } from '@features/kandang/constant/schema';

type Events = 
  { type: 'FETCHING_DATA'} |
  { type: 'OPEN_MODAL_CREATE_DATA'} | 
  { type: 'CLOSE_MODAL_DATA'} | 
  { type: 'SUBMIT_CREATE_DATA', params: ValidationFormKandang} |
  { type: 'OPEN_MODAL_EDIT_DATA', params: ValidationFormKandang, id: number} | 
  { type: 'SUBMIT_EDIT_DATA', params: ValidationFormKandang}|
  { type: 'OPEN_MODAL_DELETE_DATA', id: number} |
  { type: 'SUBMIT_DELETE_DATA'};

type Context = {
  formModal: KandangModal;
  formDelete: FormDeleteModal;
  data: ListKandang;
  loading: boolean;
  params: ValidationFormKandang;
  id: number;
}
type Services = {
  getDataKandang: {
    data: ListKandang;
  }
  postDataKandang: {
    data: Kandang
  }
  putDataKandang: {
    data: Kandang
  }
  deleteDataKandang: {
    data: Kandang
  }
}

export const kandangMachine = createMachine({
  predictableActionArguments: true,
  tsTypes: {} as import('./kandangMachine.typegen').Typegen0,
  schema: {
    context: {} as Context,
    events: {} as Events,
    services: {} as Services,
  },
  context: {
    formModal: {
      title: 'Tambah Kandag',
      isOpen: false,
    },
    formDelete:{
      isOpen:false,
    },
    data: {
      size: 0,
      cages: [],
    },
    id: 0,
    loading: true,
    params:{
      name: '',
      address: '',
      information: '',
    }
  },
  id:'kandang-machine',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCHING_DATA: {
          target: 'loading'
        }
      }
    },
    loading: {
      invoke: {
        src: 'getDataKandang',
        onDone: [
          {
            target: 'loaded',
            actions: 'set data kandang'
          }
        ],
        onError: [{
          target: 'loaded',
          actions: 'show toast error'
        }],
      }
    },
    loaded: {
      on: {
        OPEN_MODAL_CREATE_DATA: {
          actions: 'open-modal',
          target: 'modalCreateOpen',
        },
        OPEN_MODAL_EDIT_DATA:{
          actions: ['open-modal', 'set-edit-data', 'set-title-form'],
          target: 'modalEditOpen',
        },
        OPEN_MODAL_DELETE_DATA: {
          target: 'modalDeleteOpen',
          actions: ['set-delete-data']
        }
      }
    },
    modalCreateOpen: {
      on:{
        CLOSE_MODAL_DATA: {
          actions: 'close-modal',
          target: 'loaded',
        },
        SUBMIT_CREATE_DATA: {
          actions: 'submit-value-data',
          target: 'loadingSubmitData'
        }
      }
    },
    loadingSubmitData: {
      invoke: {
        src: 'postDataKandang',
        onDone:[
          {
            target:'loading',
            actions: ['close-modal', 'show toast success']
          }
        ],
        onError:[
          {
            actions: ['close-modal','show toast error'],
            target: 'loaded'
          }
        ]
      },
    },
    modalEditOpen:{
      on: {
        CLOSE_MODAL_DATA: {
          actions: 'close-modal',
          target: 'loaded',
        },
        SUBMIT_EDIT_DATA:{
          target:'loadingEditData',
          actions: 'submit-value-data',
        }
      }
    },
    loadingEditData:{
      invoke:{
        src:'putDataKandang',
        onDone:[
          {
            target:'loading',
            actions: ['close-modal', 'show toast success']
          }
        ],
        onError:[
          {
            actions: ['close-modal','show toast error'],
            target: 'loaded'
          }
        ]
      }
    },
    modalDeleteOpen: {
      on:{
        CLOSE_MODAL_DATA:{
          actions: 'close-modal-delete',
          target: 'loaded',
        },
        SUBMIT_DELETE_DATA:{
          target: 'loadingDeleteData',
        }
      }
    },
    loadingDeleteData: {
      invoke:{
        src:'deleteDataKandang',
        onDone:[
          {
            target:'loading',
            actions: ['close-modal-delete', 'show toast success']
          }
        ],
        onError:[
          {
            actions: ['close-modal-delete','show toast error'],
            target: 'loaded'
          }
        ]
      }
    },
  }
},{
  actions: {
    'open-modal': assign((context: Context) => {
      return{
        formModal:{
          title: 'Tambah Kandang',
          isOpen: true
        }
      }
    }),
    'close-modal': assign((context: Context) => {
      return{
        formModal:{
          ...context.formModal,
          isOpen: false
        }
      }
    }),
    'set data kandang': assign((_context: Context, event) => {
      return {
        loading: false,
        data: event.data
      }
    }),
    'submit-value-data': assign((_context: Context, event) => {
      return {
        params: event.params,
      }
    }),
    'set-title-form':assign((context: Context) => {
      return {
        formModal:{
          ...context.formModal,
          title: 'Edit Kandang',
        }
      }
    }),
    'set-edit-data': assign((_context: Context, event) => {
      return {
        params: event.params,
        id: event.id,
      }
    }),
    'set-delete-data':assign((_context: Context, event) => {
      return {
        formDelete:{
          isOpen:true
        },
        id: event.id
      }
    }),
    'close-modal-delete':assign((_context: Context, event) => {
      return{
        formDelete:{
          isOpen:false,
        }
      }
    }),
    'show toast error': (_context: Context, event: any) => {
      Toast(event.data.message || 'Something wrong', true)
    },
    'show toast success': (_context: Context, event: any) => {
      Toast(event.data.message || 'Something wrong', false)
    }
  },
  services: {
    getDataKandang: (_context: Context) => {
      return getDataKandang();
    },
    postDataKandang: (context: Context) => {
      return postDataKandang(context.params);
    },
    putDataKandang: (context: Context) => {
      return putDataKandang(context.params, context.id);
    },
    deleteDataKandang: (context: Context) => {
      return deleteDataKandang(context.id);
    },
  }
})

export const servicekandangMachine = interpret(kandangMachine);

servicekandangMachine.start();