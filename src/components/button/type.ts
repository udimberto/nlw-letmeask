import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { LinkProps } from 'react-router-dom'

interface ButtonCommonProps {
  block?: boolean;
  variant?: string;
}

export interface ButtonProps extends ButtonCommonProps, ButtonHTMLAttributes<HTMLButtonElement> {}
export interface ButtonAnchorProps extends ButtonCommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {}
export interface ButtonLinkProps extends ButtonCommonProps, LinkProps {}
