export interface Project {
  projectId: number;
  projectName: string;
  projectCode: string;
  location?: string;
  description?: string;
  status?: string;
  imageURL?: string;
}

export interface Property {
  propertyId: number;
  projectId: number;
  projectName?: string;
  builderName?: string;
  propertyType?: string;
  bhk?: string;
  areaSqFt?: number;
  price?: number;
  floorNo?: number;
  totalFloors?: number;
  facing?: string;
  bedrooms?: number;
  bathrooms?: number;
  propertyStatus?: string;
  description?: string;
  images?: PropertyImage[];
  floorPlan?: FloorPlan;
  xr?: XRModel;
}

export interface PropertyImage {
  imageId: number;
  imageURL: string;
  imageType?: string;
  displayOrder?: number;
}

export interface FloorPlan {
  floorPlanId: number;
  floorPlanURL: string;
  description?: string;
}

export interface XRModel {
  xrModelId: number;
  projectId?: number;
  propertyId?: number;
  modelType: string;
  modelURL: string;
  thumbnailURL?: string;
  version?: string;
  arSupported: boolean;
  vrSupported: boolean;
  isActive?: boolean;
}

export interface Room {
  roomId: number;
  propertyId: number;
  roomKey: string;
  displayName: string;
  description: string;
  areaSqFt: number;
  features: string;
  isActive: boolean;
}

export interface Inquiry {
  propertyId: number;
  name: string;
  phone: string;
  email?: string;
  message: string;
}