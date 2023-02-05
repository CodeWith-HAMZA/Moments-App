 
import { FilterOptions } from "../Interfaces/FilterOptions";
   

// * Filteration-Mode Of The Notes
export const NotesFilterSelectionList: FilterOptions[] = [
  {
    value: "title",
    label: "Find By Title",
  },
  {
    value: "description",
    label: "Find By Description",
  },
  {
    value: "both",
    label: "Find By (Both)",
  },
];
