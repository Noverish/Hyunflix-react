import { Encode } from 'models';

export const ENCODE_LIST = 'ENCODE_LIST';
export const ENCODE_LIST_SUCCESS = 'ENCODE_LIST_SUCCESS';

export const encodeList = () => ({
  type: ENCODE_LIST,
});

export const encodeListSuccess = (encodes: Encode[]) => ({
  type: ENCODE_LIST_SUCCESS,
  encodes,
});
