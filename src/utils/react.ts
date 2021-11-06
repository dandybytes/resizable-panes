import React from 'react'

/**
 * Get only the valid children of a React component and ignore nullish/falsy ones
 * @param children A React component's "children" prop
 * @returns array of valid children
 */
export const getValidChildren = (children: React.ReactNode): React.ReactElement[] => {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  ) as React.ReactElement[]
}
