import DFRequest from "..";

export function getUserList() {
  return DFRequest.get({ url: "/users/list" });
}
