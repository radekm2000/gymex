import { create } from "zustand";

type State = {
  showCheckboxesInSets: boolean;
  toggleSetCheckboxes: () => void;
};

export const useSettingsStore = create<State>((set) => ({
  showCheckboxesInSets: false,

  toggleSetCheckboxes: () =>
    set((state) => ({ showCheckboxesInSets: !state.showCheckboxesInSets })),
}));
