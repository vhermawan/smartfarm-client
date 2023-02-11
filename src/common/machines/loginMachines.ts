import { assign, createMachine } from 'xstate';
import { API } from '@common/api/api';
import { showNotification } from '@mantine/notifications';
import Cookies from 'js-cookie';

export const loginMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AtAWwEMBjAC2zADoMJkwBiASQDkAFAVQBUB9AUQFkAggwAyAbQAMAXUSgADqlgYALhlRYZIAB6IAbOIoB2HQA4DAFnEBOAIyWzlkzoA0IAJ6IATNf1nTvyx4GxtYeAMwGAL4RLmiYuISk5FQ09Mzs3CwCAMpZAOoA8gBKACIS0kgg8ooqahraCGYeFOItrW2t1i7uCMahFNYArDoeA4MG4mY6OpbGUTHo2PjEZFiU1LR0AMLCDJsA0lxZbABCfAzcx5wc+UxlGlXKquoV9WFNoeLDox46g58DoS6iFCHiaAwGBg+OgGoOMvQGcxAsUWCRWlDQBAg2CgdAgajWWAAbqgANbohbxZZJDFYrBQBDYYlEAg1LBlO4VB6suqIII6Ci9cxw6w6MyhUKDIEIDzGAbNAYtDz2Uzg8ShRHIymJVYUGnYuhgABOhtQhoosmQLIAZqa8LqKUtteTMdiGUTUMzWeypPcFI9ai9gcZLP0TAZxh5LOLRVLQX1xbCIQYBmZzKmotEQFhUBA4BpNY60claL7qk8eT1jBRQgMo+HxOHpsGPFKJWZDCFRorwSDIpmC6jqagXXTS-7nqB6gNjO2zEMftZrGKrAZLLHZf0Oh9jJ8QWYNQ7BzrYABXIhEODwTl+7mBhDeawGZqtSOgyNWZxuTwzii18JGEJxllSwDziQtyDHW9J0QHA5UseCEMQxDAS-BAcB0DMIiAA */
createMachine (
  {
  context: {
    userData: {},
    username: undefined,
    password: undefined,
    isUsernameError: false,
    isPasswordError: false,
    loading: false,
  },
  id: "login-machine",
  initial: "idle",
  states: {
    idle: {
      on: {
        INPUT_USERNAME: {
          target: "idle",
          actions: "setUsername",
          internal: false,
        },
        INPUT_PASSWORD: {
          target: "idle",
          actions: ["setPassword", "verifyUsername","verifyPassword"],
          internal: false,
        },
        CLICK_SUBMIT_BUTTON: {
          target: "loading",
          cond: "isFormValid",
          actions:["setLoading"],
        },
      },
    },
    loading: {
      invoke: {
        src: "submitForm",
        onDone: [
          {
            target: "success",
            actions: "redirectDashboardPage",
          },
        ],
        onError: [
          {
            target: "idle",
            actions: ["showToastError"],
          },
        ],
      },
    },
    success: {
      entry: "notifySuccess",
      type: "final",
    },
  },
},{
  actions:{ /*to set state*/
    verifyUsername: assign({
      isUsernameError(context: any){
        if(context.username){
          return context.isUsernameError;
        }else{
          return !context.isUsernameError;
        }
      },
    }),
    verifyPassword: assign({
      isPasswordError(context: any) {
        if(context.password){
          return context.isPasswordError
        }else{
          return !context.isPasswordError
        }
      }
    }),
    setUsername: assign({
      username: (_, event: any) => event.value,
    }),
    setPassword: assign({
      password: (_, event: any) => event.value
    }),
    setLoading: assign({
      loading: (context, _) => !context.loading
    }),
    showToastError:(_, eventData) => {
      showNotification({
        title: 'Error',
        message: eventData.data.statusText,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[6],
            borderColor: theme.colors.red[6],
            '&::before': { backgroundColor: theme.white },
          },
          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.red[7] },
          },
        }),
      })
    },
  },
  services:{ /*to make fetch data return in promise*/
    submitForm: async (context, eventData) => {
      let token = await API.post("/auth/login",{
        username: context.username,
        password: context.password,
      })
      Cookies.set('token', token.data)
      return token;
    },
  },
  guards:{ /*to make condition*/
    isFormValid: (context, event) => {
      if(!context.isUsernameError && !context.isPasswordError) {
        return true
      }else{
        return false
      }
    }
  }
}
)