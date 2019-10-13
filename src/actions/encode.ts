import { Encode } from 'models';

export const ENCODE_LIST = 'ENCODE_LIST';
export const ENCODE_LIST_SUCCESS = 'ENCODE_LIST_SUCCESS';

export interface EncodeListAction {
  type: typeof ENCODE_LIST;
}

export interface EncodeListSuccessAction {
  type: typeof ENCODE_LIST_SUCCESS;
  encodes: Encode[];
}

// export type EncodeActionTypes =
//   | EncodeListAction
//   | EncodeListSuccessAction;

export function encodeList(): EncodeListAction {
  return {
    type: ENCODE_LIST,
  };
}

export function encodeListSuccess(encodes: Encode[]): EncodeListSuccessAction {
  return {
    type: ENCODE_LIST_SUCCESS,
    encodes,
  };
}
