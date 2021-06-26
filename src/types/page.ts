import { ReactElement } from 'react'

export interface PageType extends ReactElement {
  exact?: boolean;
  layout?: string;
  path: string;
}
