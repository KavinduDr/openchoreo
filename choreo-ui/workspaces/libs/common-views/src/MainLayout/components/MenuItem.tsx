import { NavItemBase, NavItemExpandable } from '@open-choreo/design-system';

interface MenuMenuItemProps extends NavItemBase {
  id: string;
  isExpanded: boolean;
  onClick: (id: string) => void;
  subMenuItems?: NavItemBase[];
  selectedKey?: string;
  disabled?: boolean;
}
export function MenuItem({
  id,
  icon,
  onClick,
  selectedKey,
  subMenuItems,
  isExpanded,
  disabled,
  title,
  selectedIcon,
  href,
  pathPattern,
}: MenuMenuItemProps) {
  return (
    <NavItemExpandable
      id={id}
      onClick={(selectedId) => onClick(selectedId)}
      title={title}
      icon={icon}
      selectedIcon={selectedIcon}
      href={href}
      selectedId={selectedKey}
      isExpanded={isExpanded}
      subMenuItems={subMenuItems}
      disabled={disabled}
      pathPattern={pathPattern}
    />
  );
}
