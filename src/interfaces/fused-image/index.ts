import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface FusedImageInterface {
  id?: string;
  image_path: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface FusedImageGetQueryInterface extends GetQueryInterface {
  id?: string;
  image_path?: string;
  organization_id?: string;
}
