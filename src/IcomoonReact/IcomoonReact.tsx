import React from "react";
import "./IcomoonReact.css"

export const iconList = iconSet => {
  const list: Array<string> = [];
  iconSet.icons.forEach(icon => {
    list.push(icon.properties.name.split(", ")[0]);
  });
  return list;
};

function getSvg(icon, iconSet, styles, size, className, rest) {
  const find = iconEl => iconEl.properties.name.split(", ").includes(icon);
  const currentIcon = iconSet.icons.find(find);
  const renderPath = iconObj => (path, index) => {
    const attrs = (iconObj.attrs && iconObj.attrs[index]) || {};
    return <path style={styles.path} key={index} d={path} {...attrs} />;
  };

  if (currentIcon) {
    return (
      <svg
        className={className}
        style={styles.svg}
        width={size}
        height={size}
        viewBox={`0 0 ${currentIcon.icon.width || "1024"} 1024`}
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        {currentIcon.icon.paths.map(renderPath(currentIcon.icon))}
      </svg>
    );
  }
  console.warn(`icon ${icon} does not exist.`);
  return null;
}

export interface IcomoonReactProps {
  iconSet: Object;
  icon: string;
  color?: string;
  className?: string;
  size?: string | number;
  style?: React.CSSProperties;
  spinning?: boolean;
  [x: string]: any;
}

export const IcomoonReact: React.FC<IcomoonReactProps> = props => {
  const {
    className = "",
    color,
    icon,
    iconSet,
    size = "100%",
    spinning = false;
    style = {},
    ...rest
  } = props;

  const styles = {
    svg: {
      display: "inline-block",
      verticalAlign: "middle",
      ...style
    },
    path: {
      fill: color
    }
  };

  return <div className={`${spinning ? "spin" : ""}`}>{getSvg(icon, iconSet, styles, size, className, rest)</div>;
};

IcomoonReact.displayName = `IcomoonReact`;

export default IcomoonReact;
