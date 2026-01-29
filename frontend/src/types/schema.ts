import type { components } from './api';

// Cleaner schema file for DTOs

type Schemas = components['schemas'];

export type LoginResponse = Schemas['ChasRoomsServerDomainDTOsAuthLoginResponse'];
export type GoogleLoginRequest = Schemas['ChasRoomsServerDomainDTOsAuthGoogleLoginRequest'];