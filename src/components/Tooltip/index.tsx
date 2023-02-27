/**
 * Tooltip component.
 */

import React, { PropsWithChildren, ReactElement } from "react";
import RCTooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap.css';
import { AlignType } from "@rc-component/trigger";

interface ITooltipProps {
  id: string,
  position: string,
  content: ReactElement,
  className: string,
  onTooltipHover?: ((visible?: boolean) => void),
  onPopupAlign?: ((popupDomNode: HTMLElement, align: AlignType) => void) | undefined,
  align?: AlignType,
  trigger?: ['hover'],
  defaultVisible?: boolean,
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
  defaultVisible,
  children,
} : PropsWithChildren<ITooltipProps>) {
  return (
    <RCTooltip
      id={id}
      placement={position}
      overlay={content}
      overlayClassName={className}
      onVisibleChange={onTooltipHover}
      onPopupAlign={onPopupAlign}
      align={align}
      trigger={trigger}
      defaultVisible={defaultVisible}
    >
      {children as ReactElement}
    </RCTooltip>
  );
}

export default Tooltip;
