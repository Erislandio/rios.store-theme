
export const ConditionalLayout = ({
  conditional,
  children,
}: {
  conditional: boolean
  children: any
}) => {
  if (conditional) {
    return children
  }

  return null
}
