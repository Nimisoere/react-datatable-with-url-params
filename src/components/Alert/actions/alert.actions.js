import { alertConstants } from "../constants/alert.constants";

export const alertActions = {
  success,
  error,
  clear
};
export function success(message, section) {
  return { type: alertConstants.SUCCESS, message, section };
}
export function error(message, section) {
  return { type: alertConstants.ERROR, message, section };
}
export function clear() {
  return { type: alertConstants.CLEAR };
}
