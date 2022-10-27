import produce from "immer";
import create from "zustand";
// const initialUsers = { uid: "123", name: "nama" };
const initmyStore = {};
const useMyStore = create((set) => ({
  usersAuth: initmyStore,
  onUserAuth: async (param) => {
    try {
      set(
        produce((state) => {
          state.usersAuth = param;
          console.log(param);
        })
      );
    } catch (err) {
      console.log(err);
    }
  },
}));

export const selectMyStore = (state) => state.usersAuth;
export const selectfetchUserAuth = (state) => state.onUserAuth;
export default useMyStore;
