/**
 * Tooltip component.
 */

import React, { PropsWithChildren, ReactElement } from "react";
import RCTooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap.css';

interface ITooltipProps {
  id: string,
  position: string,
  content: ReactElement,
  className: string,
  onTooltipHover?: ((visible?: boolean) => void),
  placeArrow?: ((popupDomNode: Element, align: Object) => void) | undefined,
  align?: {},
  trigger?: ['hover'],
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
