export interface ResponseApi {
  message: string;
  success: boolean;
}

export interface ResponseApiCreateEntity<T> extends ResponseApi {
  data: T;
}

export interface ResponseApiGetEntity<T> extends ResponseApi {
  data: T[];
}
