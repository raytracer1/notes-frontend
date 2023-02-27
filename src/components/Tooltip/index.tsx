/**
 * Tooltip component.
 */

import React, { PropsWithChildren, ReactElement } from "react";
import RCTooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap.css';
import './style.scss';

interface ITooltipProps {
  id: string,
  position: string,
  content: ReactElement,
  className: string,
  trigger?: ['hover'],
  onTooltipHover?: ((visible?: boolean) => void),
  placeArrow?: ((popupDomNode: Element, align: Object) => void) | undefined,
  align?: {},
  suppressDiv?: boolean,
  defaultVisible?: boolean,
}

function Tooltip({
  id,
  position,
  content,
  className,
  onTooltipHover,
  placeArrow,
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
      onPopupAlign={placeArrow}
      align={align}
      trigger={trigger}
      defaultVisible={defaultVisible}
    >
      {children as ReactElement}
    </RCTooltip>
  );
}

export default Tooltip;
