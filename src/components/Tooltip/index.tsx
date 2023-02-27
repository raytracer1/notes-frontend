/**
 * Tooltip component.
 */

import React, { PropsWithChildren, ReactElement } from "react";
import RCTooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap.css';
import type { ActionType, AlignType } from '@rc-component/trigger/lib/interface';

interface ITooltipProps {
  id?: string,
  position?: string,
  align?: AlignType,
  onPopupAlign?: ((popupDomNode: HTMLElement, align: AlignType) => void) | undefined,
  content?: ReactElement,
  className?: string,
  onTooltipHover?: ((visible?: boolean) => void),
  trigger?: ActionType[],
  showArrow?: boolean,
}

function Tooltip({
  id,
  position,
  content,
  className,
  onTooltipHover,
  onPopupAlign,
  align,
  trigger,
  showArrow,
  children,
} : PropsWithChildren<ITooltipProps>) {
  return (
    <RCTooltip
      id={id}
      placement={position}
      align={align}
      onPopupAlign={onPopupAlign}
      overlay={content}
      overlayClassName={className}
      onVisibleChange={onTooltipHover}
      trigger={trigger}
      showArrow={showArrow}
    >
      {children as ReactElement}
    </RCTooltip>
  );
}

export default Tooltip;
