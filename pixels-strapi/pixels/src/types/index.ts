export * from './canvas';
export * from "./pixel";
export * from "./user";

export interface LiveEvent {
  type: 'created' | 'updated' | 'deleted';
  resource: string;
  payload: any;
}