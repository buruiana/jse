import { history } from "../redux/store";

export const navigate = id => {
  history.push(id);
};
