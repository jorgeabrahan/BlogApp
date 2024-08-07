export const getNameInitials = (fullName = '') => {
  const name = fullName.split(' ')
  const initials = [name[0]?.charAt(0), name[1]?.charAt(0)]
  return initials.filter((char) => char).join('').toUpperCase()
}
