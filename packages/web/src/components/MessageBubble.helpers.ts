import { createElement, type AnchorHTMLAttributes, type TableHTMLAttributes } from 'react';
import remarkGfm from 'remark-gfm';
import type { Approval, Message, RpcClient } from '@hermes-pwa/core';

export interface MessageBubbleProps {
  message: Message;
  rpc: RpcClient;
  isLast?: boolean;
  streaming?: boolean;
  liveStatus?: string;
  liveFace?: string | undefined;
  pendingApprovals?: Approval[] | undefined;
  activeSessionIds?: string[] | undefined;
}

export function areMessageBubblePropsEqual(prev: MessageBubbleProps, next: MessageBubbleProps): boolean {
  return (
    prev.message === next.message &&
    prev.rpc === next.rpc &&
    prev.isLast === next.isLast &&
    prev.streaming === next.streaming &&
    prev.liveStatus === next.liveStatus &&
    prev.liveFace === next.liveFace &&
    prev.pendingApprovals === next.pendingApprovals &&
    prev.activeSessionIds === next.activeSessionIds
  );
}

// GitHub-flavoured markdown: tables, strikethrough, task lists, autolinks.
// Without it assistant tables collapse into one pipe-separated paragraph.
export const MARKDOWN_REMARK_PLUGINS = [remarkGfm];

export const MARKDOWN_COMPONENTS = {
  // Wrap tables so wide ones scroll horizontally on phones instead of clipping.
  table: ({ children, ...props }: TableHTMLAttributes<HTMLTableElement>) =>
    createElement(
      'div',
      { className: 'hm-md-table-wrap' },
      createElement('table', props, children),
    ),
  a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    createElement(
      'a',
      {
        ...props,
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      children,
    ),
};
