
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.kandang-machine.loading:invocation[0]": { type: "done.invoke.kandang-machine.loading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.kandang-machine.loadingDeleteData:invocation[0]": { type: "done.invoke.kandang-machine.loadingDeleteData:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.kandang-machine.loadingEditData:invocation[0]": { type: "done.invoke.kandang-machine.loadingEditData:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.kandang-machine.loadingSubmitData:invocation[0]": { type: "done.invoke.kandang-machine.loadingSubmitData:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.kandang-machine.loading:invocation[0]": { type: "error.platform.kandang-machine.loading:invocation[0]"; data: unknown };
"error.platform.kandang-machine.loadingDeleteData:invocation[0]": { type: "error.platform.kandang-machine.loadingDeleteData:invocation[0]"; data: unknown };
"error.platform.kandang-machine.loadingEditData:invocation[0]": { type: "error.platform.kandang-machine.loadingEditData:invocation[0]"; data: unknown };
"error.platform.kandang-machine.loadingSubmitData:invocation[0]": { type: "error.platform.kandang-machine.loadingSubmitData:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "deleteDataKandang": "done.invoke.kandang-machine.loadingDeleteData:invocation[0]";
"getDataKandang": "done.invoke.kandang-machine.loading:invocation[0]";
"postDataKandang": "done.invoke.kandang-machine.loadingSubmitData:invocation[0]";
"putDataKandang": "done.invoke.kandang-machine.loadingEditData:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "close-modal": "CLOSE_MODAL_DATA" | "done.invoke.kandang-machine.loadingEditData:invocation[0]" | "done.invoke.kandang-machine.loadingSubmitData:invocation[0]" | "error.platform.kandang-machine.loadingEditData:invocation[0]" | "error.platform.kandang-machine.loadingSubmitData:invocation[0]";
"close-modal-delete": "CLOSE_MODAL_DATA" | "done.invoke.kandang-machine.loadingDeleteData:invocation[0]" | "error.platform.kandang-machine.loadingDeleteData:invocation[0]";
"open-modal": "OPEN_MODAL_CREATE_DATA" | "OPEN_MODAL_EDIT_DATA";
"set data kandang": "done.invoke.kandang-machine.loading:invocation[0]";
"set-delete-data": "OPEN_MODAL_DELETE_DATA";
"set-edit-data": "OPEN_MODAL_EDIT_DATA";
"set-title-form": "OPEN_MODAL_EDIT_DATA";
"show toast error": "error.platform.kandang-machine.loading:invocation[0]" | "error.platform.kandang-machine.loadingDeleteData:invocation[0]" | "error.platform.kandang-machine.loadingEditData:invocation[0]" | "error.platform.kandang-machine.loadingSubmitData:invocation[0]";
"show toast success": "done.invoke.kandang-machine.loadingDeleteData:invocation[0]" | "done.invoke.kandang-machine.loadingEditData:invocation[0]" | "done.invoke.kandang-machine.loadingSubmitData:invocation[0]";
"submit-value-data": "SUBMIT_CREATE_DATA" | "SUBMIT_EDIT_DATA";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "deleteDataKandang": "SUBMIT_DELETE_DATA";
"getDataKandang": "FETCHING_DATA" | "done.invoke.kandang-machine.loadingDeleteData:invocation[0]" | "done.invoke.kandang-machine.loadingEditData:invocation[0]" | "done.invoke.kandang-machine.loadingSubmitData:invocation[0]";
"postDataKandang": "SUBMIT_CREATE_DATA";
"putDataKandang": "SUBMIT_EDIT_DATA";
        };
        matchesStates: "idle" | "loaded" | "loading" | "loadingDeleteData" | "loadingEditData" | "loadingSubmitData" | "modalCreateOpen" | "modalDeleteOpen" | "modalEditOpen";
        tags: never;
      }
  