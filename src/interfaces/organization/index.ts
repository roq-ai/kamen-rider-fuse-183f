import { FusedImageInterface } from 'interfaces/fused-image';
import { KamenRiderImageInterface } from 'interfaces/kamen-rider-image';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  fused_image?: FusedImageInterface[];
  kamen_rider_image?: KamenRiderImageInterface[];
  user?: UserInterface;
  _count?: {
    fused_image?: number;
    kamen_rider_image?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
