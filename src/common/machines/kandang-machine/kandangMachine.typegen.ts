
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.kandang-machine.loading:invocation[0]": { type: "done.invoke.kandang-machine.loading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getDataKandang": "done.invoke.kandang-machine.loading:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "close-modal-create": "CLOSE_MODAL_CREATE_DATA";
"open-modal-create": "OPEN_MODAL_CREATE_DATA";
"set data kandang": "done.invoke.kandang-machine.loading:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "getDataKandang": "FETCHING_DATA";
        };
        matchesStates: "idle" | "loaded" | "loading" | "modalCreateOpen";
        tags: never;
      }
  