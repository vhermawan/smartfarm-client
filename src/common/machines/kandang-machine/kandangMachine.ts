import { assign, createMachine, interpret } from 'xstate';
// import { API } from '@common/api/api';
// import { showNotification } from '@mantine/notifications';
import { KandangModal } from '@features/kandang/types';

type Events = 
  { type: 'FETCHING_DATA'} |
  { type: 'OPEN_MODAL_CREATE_DATA'} | 
  { type: 'CLOSE_MODAL_CREATE_DATA'};

type Context = {
  createModal: KandangModal
}
type Services = {}

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
  },
  id:'kandang-machine',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCHING_DATA: {
          target: 'loaded'
        }
      }
    },
    loading: {},
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
    'open-modal-create': assign(() => {
      return{
        createModal:{
          isOpen: true
        }
      }
    }),
    'close-modal-create': assign(() => {
      return{
        createModal:{
          isOpen: false
        }
      }
    })
  }
})

export const servicekandangMachine = interpret(kandangMachine);

servicekandangMachine.start();