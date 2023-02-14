import { assign, createMachine, interpret } from 'xstate';
import { KandangModal, ListKandang } from '@features/kandang/types';
import { getDataKandang } from '@common/services/kandangService';

type Events = 
  { type: 'FETCHING_DATA'} |
  { type: 'OPEN_MODAL_CREATE_DATA'} | 
  { type: 'CLOSE_MODAL_CREATE_DATA'};

type Context = {
  createModal: KandangModal
  data: ListKandang;
  loading: boolean;
}
type Services = {
  getDataKandang: {
    data: ListKandang;
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
    createModal: {
      isOpen: false,
    },
    data: {
      size: 0,
      cages: [],
    },
    loading: true,
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
          target: 'loaded'
          // actions: 
        }],
      }
    },
    loaded: {
      on: {
        OPEN_MODAL_CREATE_DATA: {
          actions: 'open-modal-create',
          target: 'modalCreateOpen',
        }
      }
    },
    modalCreateOpen: {
      on:{
        CLOSE_MODAL_CREATE_DATA: {
          actions: 'close-modal-create',
          target: 'loaded',
        }
      }
    },
  }
},{
  actions: {
    'open-modal-create': assign((_context) => {
      return{
        createModal:{
          isOpen: true
        }
      }
    }),
    'close-modal-create': assign((_context) => {
      return{
        createModal:{
          isOpen: false
        }
      }
    }),
    'set data kandang': assign((context: Context, event) => {
      return {
        loading: false,
        data: event.data
      }
    })
  },
  services: {
    getDataKandang: (_context: Context) => {
      return getDataKandang();
    }
  }
})

export const servicekandangMachine = interpret(kandangMachine);

servicekandangMachine.start();