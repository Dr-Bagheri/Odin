export interface Pixel {
  id: string;
  canvas_id: string;
  user_id: string;
  x: number;
  y: number;
  color: string;
  created_at: string;
  name?: string;
  user?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export interface PixelChange {
  type: 'created' | 'updated';
  payload: Pixel;
}

export interface LiveEvent {
  type: 'created' | 'updated' | 'deleted';
  resource: string;
  payload: any;
}